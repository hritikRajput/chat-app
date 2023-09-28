import ChatList from './ChatList';
import SearchBox from './SearchBox';
import GroupChatModal from './GroupChatModal';
import { useState } from 'react';
import addGroup from "../assets/add-group.png";

const Sidebar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false); // Add a state variable to track search box focus

    // Handle modal opening
    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    // Callback to track search box focus
    const handleSearchFocus = (focused) => {
        setIsSearchFocused(focused);
    };


    return (
        <div className={`h-full basis-1/3 ${(isSearchFocused ? "bg-slate-gray" : "")}`}>
            <SearchBox onFocus={handleSearchFocus} />
            {!isSearchFocused && (
                <div>
                    <div className='flex justify-between items-center mb-2 p-2'>
                        <h2 className='font-bold text-slate-gray text-xl'>Messages</h2>
                        <div onClick={handleModalOpen} className='cursor-pointer w-[2rem] h-[2rem]'>
                            <img src={addGroup} alt="create new group" title="Create New Group" className='w-full h-full' />
                        </div>
                    </div>
                    <div>
                        {isModalOpen && <GroupChatModal closeModal={() => setIsModalOpen(false)} />}
                        <ChatList />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
