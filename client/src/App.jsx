import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Chat from './pages/Chat'
import Login from './pages/Login'
import Register from './pages/Register'

const App = () => {
  return (
    <div className='h-[100vh]'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
