import { useDispatch, useSelector } from "react-redux";
import { authFailure, loginSuccess } from "../../redux/slices/authSlice/authSlice";
import { logIn } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
    //get the dispatch function from redux
    const dispatch = useDispatch();

    const navigate = useNavigate();
    //state to manage form data
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [errorMessage, setErrorMessage] = useState("")
    console.log(formData)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.email || !formData.password) {
            setErrorMessage("Email and password is required.")
            return;
        }

        try {
            const data = await logIn(formData);
            if (data) {
                dispatch(loginSuccess(data));
                localStorage.setItem('user', JSON.stringify(data.user))
                navigate("/chat")
            }
            else {
                setErrorMessage("Login failed. Please try again later.");
                dispatch(authFailure(errorMessage))
            }
        } catch (error) {
            console.error("Error during logging you in:", error);
            setErrorMessage("An error occurred during logging you in.");
            dispatch(authFailure(errorMessage));
        }
    }



    return (
        <div className="w-[480px] mx-auto mt-8 rounded-lg overflow-hidden bg-pearl-white text-slate-gray">
            <div className="py-8 px-12">
                <h2 className="text-2xl mb-4 font-bold">Sign in to Chatpal</h2>
                <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <label htmlFor="email" className="font-semibold">Email*</label>
                    <input type="email" className="rounded p-2 outline-none" name="email" value={formData.email} onChange={handleChange} required />
                    <label htmlFor="password" className="font-semibold">Password*</label>
                    <input type="password" className="rounded p-2 outline-none" name="password" value={formData.password} onChange={handleChange} required />
                    <button className="bg-royal-purple p-2 rounded text-pearl-white">Sign in</button>
                    <p>Don&apos;t have an account? Sign up</p>
                    <div className="text-sm">* fields are mandatory</div>
                </form>
                {errorMessage && <div className="text-red-500">{errorMessage}</div>}
            </div>
        </div>
    )
}

export default Login
