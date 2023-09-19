import { useDispatch, useSelector } from "react-redux"
import Sidebar from "../components/Sidebar"
import { loginSuccess } from "../../redux/slices/authSlice/authSlice"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { fetchChats } from "../../services/chatService"
import { getAllMessages, sendMessage } from "../../services/messageService"
import { addMessageToCurrentChat, setChats, setCurrentChat } from "../../redux/slices/chatSlice/chatSlice"
import { sendMessage as sendMessageReducer } from "../../redux/slices/messageSlice/messageSlice"

const Chat = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  //state for newMessage input
  const [newMessageText, setNewMessageText] = useState("")
  const divUnderMessage = useRef();

  //userState  in authSlice
  const userState = useSelector(state => state.auth)
  //chat state in chat Slice
  const chatState = useSelector(state => state.chat)
  //chatId, mesages, participants of current chat
  const chatId = useSelector(state => state.chat.currentChat.chatId)
  const messages = useSelector(state => state.chat.currentChat.messages);
  const participants = useSelector(state => state.chat.currentChat.participants)
  //token of logged in user
  const token = userState.user?.token

  console.log("token", token)
  console.log("chatstate", chatState)
  console.log("usersate", userState)

  //load chat page with list of all chats. If user is not logged in then navigate them to login page.
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

  //handleSendMessage will be called when user will send a message. It will call sendMessage service from messageService and dispatch the sendMessageReducer to update the message state
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessageText) {
      const message = { content: newMessageText, chatId }
      const data = await sendMessage(message, token)
      if (data) {
        console.log(data);
        dispatch(sendMessageReducer(data));
        dispatch(addMessageToCurrentChat({ message: data }));
        setNewMessageText("")
      }
    }
  }

  //load all messages of current chat. It will call getAllMessage from message service and update the currentChat in chatSlice.
  useEffect(() => {
    if (chatId && token) {
      const fetchMessages = async () => {
        const messages = await getAllMessages(chatId, token)
        console.log("messages", messages)
        dispatch(setCurrentChat({ messages, chatId, participants }))
      }
      fetchMessages();
    }
  }, [chatId, token])

  // automatically scroll to the latest message in a chat when new messages are added
  useEffect(() => {
    const div = divUnderMessage.current;
    if (div) {
      div.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages]);


  return (
    <div className="flex h-full p-8">
      <Sidebar />
      <main className="grow text-pearl-white flex flex-col justify-between px-8">
        <div>
          <h1 className="py-2 bg-slate-gray">CHAT NAME</h1>
          {/* render messages */}
          <section className="h-[400px] overflow-y-scroll">
            {messages && messages.map(message => {
              const messageContent = message.content;
              const sentBy = message.sender.name
              let isCurrentUser = false;
              if (userState.user._id === message.sender._id) {
                isCurrentUser = true;
              }
              return (
                <div key={message._id} className={`p-2 ${isCurrentUser ? "text-right" : ""}`}>
                  <div className="">
                    {`${sentBy}`}
                  </div>
                  <div className={`px-4 py-2 rounded-lg ${isCurrentUser ? "bg-royal-purple" : "bg-slate-gray"}`}>
                    {`${messageContent}`}
                  </div>
                </div>
              )
            })}
            <div ref={divUnderMessage}></div>
          </section>
        </div>
        {/* show the form for sending message if a chat is selected as currentChat */}
        {chatId && <form className="flex gap-2" onSubmit={handleSendMessage}>
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
        </form>}

      </main>
    </div >
  )
}

export default Chat
