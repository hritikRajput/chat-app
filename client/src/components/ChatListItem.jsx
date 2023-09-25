import { useDispatch, useSelector } from "react-redux";
import { setCurrentChat } from "../../redux/slices/chatSlice/chatSlice";
import Avatar from "./Avatar";

const ChatListItem = ({ chat }) => {
    const userId = useSelector(state => state.auth).user?._id
    const chatId = chat._id
    const participants = chat.participants
    const pic = chat.participants[1].pic;
    const name = chat.participants.filter(participant => participant._id !== userId)[0].name
    const latestMessage = chat.latestMessage.length ? chat.latestMessage[0].content : "";
    const currentChat = useSelector(state => state.chat.currentChat)
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(setCurrentChat({ chatId, participants }))
    }

    return (
        <div onClick={handleClick} className={"border-solid border-orange-300 border-2 p-2 mb-2 cursor-pointer flex " + (currentChat.chatId === chatId ? "bg-slate-gray" : "")}>
            <Avatar pic={pic} />
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
