const ChatListItem = () => {
    return (
        <div className="border-solid border-orange-300 border-2 p-2 mb-2 flex items-center">
            <div className="h-[48px] bg-cyan-300 basis-12 rounded-full mr-2"></div>
            <div className="flex flex-col border-solid border-blue-300 border-2 grow">
                <div className="flex justify-between border-solid border-orange-300 border-2">
                    <p>Name</p>
                    <p>Time</p>
                </div>
                <div className="flex justify-between border-solid border-orange-300 border-2">
                    <p>message</p>
                    <p>unread</p>
                </div>
            </div>
        </div>
    )
}

export default ChatListItem
