import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

const Home = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            navigate("/chat")
        }
    }, [navigate])

    return (
        <div className="px-8">
            <div>
                <h1 className="text-6xl font-bold mb-8 p-4">Welcome to Chatpal</h1>
                <h2 className="text-3xl font-bold">Connect, Chat, and Share Moments with Friends</h2>
                <p>Looking for a simple and secure way to stay connected with your friends and loved ones? ChatPal is here to make it effortless.</p>

                <h2 className="text-3xl font-bold">Join ChatPal Today!</h2>
                <p>Get started now and experience the next level of messaging. Sign up or log in to connect with friends, family, and colleagues like never before.</p>
            </div>
            <div>
                <h3 className="text-2xl">Join today</h3>
                <Link to="/register" className="bg-royal-purple p-2 mb-6 block w-fit">Create account</Link>
                <h3 className="text-2xl">Already have an account?</h3>
                <Link to="/login" className="bg-royal-purple p-2 mb-6 block w-fit">Sign in</Link>
            </div>
        </div>
    )
}

export default Home
