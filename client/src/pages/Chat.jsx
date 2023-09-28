import { useDispatch, useSelector } from "react-redux"
import Sidebar from "../components/Sidebar"
import { loginSuccess } from "../../redux/slices/authSlice/authSlice"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { fetchChats } from "../../services/chatService"
import { getAllMessages, sendMessage } from "../../services/messageService"
import { addMessageToCurrentChat, setChats, setCurrentChat } from "../../redux/slices/chatSlice/chatSlice"
import { sendMessage as sendMessageReducer } from "../../redux/slices/messageSlice/messageSlice"
import { io } from "socket.io-client"
import ChatHeader from "../components/ChatHeader"
import Avatar from "../components/Avatar"
const ENDPOINT = "http://localhost:8000";
let socket, selectedChatCompare;

const Chat = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const divUnderMessage = useRef();
  //state for newMessage input
  const [newMessageText, setNewMessageText] = useState("")

  //userState  in authSlice
  const userState = useSelector(state => state.auth)
  //chat state in chat Slice
  // const chatState = useSelector(state => state.chat)
  //chatId, mesages, participants of current chat
  const chatId = useSelector(state => state.chat.currentChat.chatId)
  const messages = useSelector(state => state.chat.currentChat.messages);
  const participants = useSelector(state => state.chat.currentChat.participants)
  //token of logged in user
  const token = userState.user?.token

  console.log("token", token)

  useEffect(() => {
    socket = io(ENDPOINT);

    if (userState.user) {
      // emit a "setup" event to send user data to the server when the user is logged in
      socket.emit("setup", userState.user);
    }
    // clean up the socket connection when the component unmounts
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [userState.user]);


  //load chat page with list of all chats. If user is not logged in then navigate them to login page.
  useEffect(() => {
    const fetchChatsData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
          dispatch(loginSuccess(userData));
          const token = userData.token;
          const chats = await fetchChats(token);
          console.log("chats", chats)
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
        socket.emit("new message", data);
        dispatch(sendMessageReducer(data));
        dispatch(addMessageToCurrentChat({ message: data }));
        setNewMessageText("")
      }
    }
  }

  useEffect(() => {
    socket.on("message received", async () => {
      const messages = await getAllMessages(chatId, token)
      dispatch(setCurrentChat({ messages, chatId, participants }))
    });
  });

  //load all messages of current chat. It will call getAllMessage from message service and update the currentChat in chatSlice.
  useEffect(() => {
    const fetchMessages = async () => {
      if (chatId && token) {
        const messages = await getAllMessages(chatId, token)
        dispatch(setCurrentChat({ messages, chatId, participants }))
        socket.emit("join room", chatId);
      }
      return
    }
    fetchMessages();
    selectedChatCompare = chatId;
  }, [chatId, token, dispatch, participants])

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
      <main className="grow flex text-pearl-white px-8">
        {chatId ?
          <div className="grow flex flex-col justify-between">
            <div className="h-[90%]">
              <ChatHeader />
              {/* render messages */}
              <section className=" overflow-y-scroll h-[80%] px-2">
                {messages && messages.map(message => {
                  const messageContent = message.content;
                  const sentBy = message.sender.name
                  const pic = message.sender.pic
                  let isCurrentUser = false;
                  if (userState.user._id === message.sender._id) {
                    isCurrentUser = true;
                  }
                  return (
                    <div key={message._id} className={`p-2 flex gap-2 ${isCurrentUser ? "flex-row-reverse" : ""}`}>
                      <Avatar pic={pic} />
                      <div>
                        <div className="">
                          {`${sentBy}`}
                        </div>
                        <div className={`px-4 py-2 rounded-lg ${isCurrentUser ? "bg-royal-purple" : "bg-slate-gray"}`}>
                          {`${messageContent}`}
                        </div>
                      </div>
                    </div>
                  )
                })}
                <div ref={divUnderMessage}></div>
              </section>
            </div>
            {/* show the form for sending message if a chat is selected as currentChat */}
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
          </div> :
          <h3 className="text-slate-gray text-3xl font-bold self-center mx-auto">
            Select a chat or start a new conversation
          </h3>
        }
      </main>
    </div >
  )
}

export default Chat
