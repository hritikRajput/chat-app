import { useEffect, useState } from "react";
import { searchUsers } from "../../services/authService";
import UserListItem from "./UserListItem";
import { useDispatch, useSelector } from "react-redux";
import { accessChat, fetchChats } from "../../services/chatService";
import { getAllMessages } from "../../services/messageService";
import { setChats, setCurrentChat } from "../../redux/slices/chatSlice/chatSlice";

const SearchBox = ({ onFocus }) => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.user?.token);
    const [searchResult, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const resetSearch = () => {
        setSearchResult([]);
        setSearchQuery("");
    }

    useEffect(() => {
        setSearchResult([])
    }, [isFocused])

    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.trim() === "") {
            resetSearch();
            return;
        }
        const result = await searchUsers(query, token);
        setSearchResult(result);
    };

    const handleSelect = async (selectedUser) => {
        resetSearch();
        const userId = selectedUser._id
        if (token && selectedUser) {
            const data = await accessChat({ userId }, token)
            const messages = await getAllMessages(data._id, token)
            const currentChat = {
                chatId: data._id,
                participants: data.participants,
                messages: messages,
            }
            const chats = await fetchChats(token);
            dispatch(setChats(chats));
            dispatch(setCurrentChat(currentChat));
        }
    }
    const handleInputFocus = (focused) => {
        onFocus(focused);
        setIsFocused(focused)
    };

    return (
        <div className="mb-4">
            <form>
                <input
                    type="text"
                    placeholder="search"
                    value={searchQuery}
                    onChange={handleSearch}
                    onFocus={() => handleInputFocus(true)} // Notify parent on focus
                    onBlur={() => handleInputFocus(false)} // Notify parent on blur
                    className="w-full py-2 pr-2 pl-10 text-base rounded-md outline-none text-slate-gray bg-pearl-white placeholder:text-slate-gray"
                />
            </form>
            {searchResult.length > 0 &&
                <div className="mb-4">
                    {searchResult.map(user => <UserListItem user={user} key={user._id} handleSelect={() => handleSelect(user)} />)}
                </div>
            }
        </div>
    )
}

export default SearchBox;
