const UserBadge = ({ user, handleRemove }) => {
    const name = user.name
    return (
        <div className="px-4 rounded bg-royal-purple text-pearl-white" onClick={handleRemove}>
            <p className="text-left">{name}</p>
        </div>
    )
}
export default UserBadge
