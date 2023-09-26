const UserListItem = ({ user, handleSelect }) => {
    const name = user.name
    const email = user.email
    return (
        <div className="mb-1 px-4 py-2 rounded-md bg-[#857799] text-pearl-white flex justify-between">
            <div>
                <p className="font-bold text-left">{name}</p>
                <p className="text-sm text-left">Email: {email}</p>
            </div>
            <button className="bg-royal-purple px-4 rounded" onClick={handleSelect}>Add</button>
        </div>
    )
}

export default UserListItem
