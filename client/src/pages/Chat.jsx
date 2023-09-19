import { useDispatch, useSelector } from "react-redux"
import Sidebar from "../components/Sidebar"
import { loginSuccess } from "../../redux/slices/authSlice/authSlice"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { fetchChats } from "../../services/chatService"
import { sendMessage } from "../../services/messageService"
import { setChats } from "../../redux/slices/chatSlice/chatSlice"
import { sendMessage as sendMessageReducer } from "../../redux/slices/messageSlice/messageSlice"

const Chat = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [newMessageText, setNewMessageText] = useState("")

  const userState = useSelector(state => state.auth)
  const chatState = useSelector(state => state.chat)
  const chatId = useSelector(state => state.chat.currentChat)
  const token = userState.user?.token
  console.log("token", token)
  console.log("chatstate", chatState)


  useEffect(() => {
    const fetchChatsData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
          dispatch(loginSuccess(userData));
          const token = userData.token;
          const chats = await fetchChats(token);
          dispatch(setChats(chats))
        }
        else {
          navigate("/login")
        }
      } catch (err) {
        console.error("Error in fetching chats", err)
      }
    }
    fetchChatsData()
  }, [navigate, dispatch])

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessageText) {
      const message = { content: newMessageText, chatId }
      const data = await sendMessage(message, token)
      if (data) {
        dispatch(sendMessageReducer(data));
        setNewMessageText("")
      }
    }
  }

  return (
    <div className="flex h-full p-8">
      <Sidebar />
      <main className="grow text-pearl-white flex flex-col justify-between px-8">
        <div>
          <h1 className="py-2 bg-slate-gray">CHAT NAME</h1>
        </div>
        <form className="flex gap-2" onSubmit={handleSendMessage}>
          <input type="text"
            value={newMessageText}
            onChange={e => setNewMessageText(e.target.value)}
            placeholder="Type your message here"
            className="bg-slate-gray text-pearl-white flex-grow rounded-md p-4 outline-none" />
          <button type="submit" className="bg-royal-purple p-4 text-pearl-white rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </form>
      </main>
    </div >
  )
}

export default Chat
