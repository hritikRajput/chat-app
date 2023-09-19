import { useSelector } from "react-redux"
import ChatListItem from "./ChatListItem"

const ChatList = () => {
    const chatState = useSelector(state => state.chat)
    const chats = chatState.chats
    return (
        <div>
            {chats.map(chat => <ChatListItem chat={chat} />)}
        </div>
    )
}

export default ChatList
