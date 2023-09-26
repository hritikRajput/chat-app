import { useSelector } from "react-redux"
import Avatar from "./Avatar"
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

            <div className="px-4 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" height="2rem" viewBox="0 0 448 512" fill="#eeeff6">
                    <path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" />
                </svg>
            </div>
        </div>
    )
}

export default ChatHeader
