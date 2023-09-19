import ChatList from './ChatList'
import SearchBox from './SearchBox'

const Sidebar = () => {
    return (
        <div className='h-full basis-1/3'>
            <SearchBox />
            <div className='flex justify-between border-2 border-orange-300 boorder-solid mb-2 p-2'>
                <h2>Messages</h2>
                <p>New</p>
            </div>
            <ChatList />
        </div>
    )
}

export default Sidebar
