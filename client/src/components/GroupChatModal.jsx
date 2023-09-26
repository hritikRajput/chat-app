import { searchUsers } from "../../services/authService"
import { createGroup, fetchChats } from "../../services/chatService"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import UserListItem from "./UserListItem"
import UserBadge from "./UserBadge"
import { setChats } from "../../redux/slices/chatSlice/chatSlice"
const GroupChatModal = ({ closeModal }) => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.user?.token)
    const [searchResult, setSearchResult] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([])
    const [chatName, setChatName] = useState("")
    console.log("chatname", chatName)
    console.log("selected users", selectedUsers)

    const handleSelect = (selectedUser) => {
        // Check if the selectedUser is already in the selectedUsers array
        const isSelected = selectedUsers.some(user => user._id === selectedUser._id);
        if (!isSelected) {
            // If the user is not selected, add them to the selectedUsers array
            setSelectedUsers([...selectedUsers, selectedUser]);
        }
    }
    const handleRemove = (selectedUser) => {
        // Check if the selectedUser is already in the selectedUsers array
        const isSelected = selectedUsers.some(user => user._id === selectedUser._id);
        if (isSelected) {
            const updatedUsers = selectedUsers.filter(user => user._id !== selectedUser._id);
            setSelectedUsers([...updatedUsers]);
        }
    }
    const handleSubmit = async () => {
        if (token && selectedUsers.length >= 2) {
            try {
                const [chat] = await createGroup({
                    name: chatName,
                    users: JSON.stringify(selectedUsers.map((user) => user._id))
                }, token);

                // Dispatch actions to update the Redux store with the new chat
                console.log("chat", chat)
                const chats = await fetchChats(token)
                dispatch(setChats(chats));
                // Close the modal
                closeModal();
            } catch (error) {
                // Handle error, show a message to the user
                console.error('Error creating group chat', error);
            }
        }
    }
    const handleSearch = async (e) => {
        const result = await searchUsers(e.target.value, token)
        setSearchResult(result.slice(0, 4))
    }
    return (
        <div className="fixed top-0 left-0 h-[100vh] w-[100vw] flex justify-center items-center opacity-1 pointer-events-auto">
            <div className="text-center bg-slate-gray py-8 px-16 rounded w-[500px] max-w-full">
                <div className="close text-red-500 cursor-pointer w-fit ml-auto mb-4" onClick={closeModal}>CLOSE</div>
                <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
                    <input type="text" placeholder="chat name ..." required className="mb-2 p-2 rounded text-lg text-slate-gray outline-none" onChange={(e) => setChatName(e.target.value)} />
                    <input type="text" placeholder="add member..." className="mb-2 p-2 rounded text-lg text-slate-gray outline-none" onChange={handleSearch} />
                    {
                        selectedUsers.length > 0 &&
                        <div className="mb-4 flex gap-1">
                            {selectedUsers.map(user => <UserBadge user={user} key={user._id} handleRemove={() => handleRemove(user)} />)}
                        </div>
                    }
                    {searchResult.length > 0 &&
                        <div className="mb-4">
                            {searchResult.map(user => <UserListItem user={user} key={user._id} handleSelect={() => handleSelect(user)} />)}
                        </div>
                    }
                    <button className="p-2 bg-royal-purple text-pearl-white w-fit ml-auto rounded" onClick={handleSubmit}>Create</button>
                </form>

            </div>
        </div>

    )
}

export default GroupChatModal
