import { useDispatch, useSelector } from "react-redux"
import Sidebar from "../components/Sidebar"
import { loginSuccess } from "../../redux/slices/authSlice/authSlice"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Chat = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userInfo = useSelector(state => state.auth.user)
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      dispatch(loginSuccess(userData));
    }
    else {
      navigate("/login")
    }
  }, [navigate, dispatch])

  console.log("userInfo: ", userInfo)

  return (
    <div className="flex h-full p-4">
      <Sidebar />
      <main className="grow">
        I am main
      </main>
    </div>
  )
}

export default Chat
