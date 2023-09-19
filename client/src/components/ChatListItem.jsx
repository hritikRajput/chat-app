import { useDispatch, useSelector } from "react-redux";
import { setCurrentChat } from "../../redux/slices/chatSlice/chatSlice";

const ChatListItem = ({ chat }) => {
    const chatId = chat._id
    const participants = chat.participants
    const messages = chat.messages
    const pic = chat.participants[1].pic;
    const name = chat.participants[1].name;
    const latestMessage = chat.latestMessage.length ? chat.latestMessage[0].content : "";
    const currentChat = useSelector(state => state.chat.currentChat)
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(setCurrentChat({ chatId, participants }))
    }

    return (
        <div onClick={handleClick} className={"border-solid border-orange-300 border-2 p-2 mb-2 flex " + (currentChat.chatId === chatId ? "bg-slate-gray" : "")}>
            <img className="h-[48px] basis-12 rounded-full mr-2" src={pic}></img>
            <div className="flex flex-col flex-1 border-solid border-blue-300 border-2">
                <div className="flex justify-between border-solid border-orange-300 border-2">
                    <p>{name}</p>
                    <p>Time</p>
                </div>
                <div className="flex justify-between border-solid border-orange-300 border-2">
                    <p className="">{latestMessage}</p>
                    <p>unread</p>
                </div>
            </div>
        </div>
    )
}

export default ChatListItem
