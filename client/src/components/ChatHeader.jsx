import { useSelector } from "react-redux"
import Avatar from "./Avatar"
import Dropdown from "./Dropdown"
const ChatHeader = () => {
    const chatId = useSelector(state => state.chat.currentChat.chatId)
    const userId = useSelector(state => state.auth).user?._id
    const selectedChat = useSelector(state => state.chat.chats).filter(chat => chat._id === chatId)[0]
    const name = selectedChat.isGroupChat ? selectedChat.name : selectedChat.participants.filter(participant => participant._id !== userId)[0].name
    const pic = selectedChat?.participants.filter(participant => participant._id !== userId)[0].pic
    return (
        <div className="flex justify-between items-center pb-2 mb-2 relative">
            <div className="flex gap-2 items-center px-4">
                <Avatar pic={pic} />
                <div>
                    <p>{name}</p>
                    {selectedChat.isGroupChat && <p className="text-slate-gray">{selectedChat.participants.length} members</p>}
                </div>
            </div>
            <Dropdown />
        </div>
    )
}

export default ChatHeader
