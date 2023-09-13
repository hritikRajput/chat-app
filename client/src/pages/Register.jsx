import { useState } from "react"
import { useDispatch } from "react-redux";
import { register } from "../../services/authService";
import { authFailure, signupSuccess } from "../../redux/slices/authSlice/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import defaultPic from "../assets/defaultPic.jpg"

const CLOUDINARY_UPLOAD_PRESET = "chat-app"
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dnah4zptv/image/upload"


const Register = () => {
    //get the dispatch function from redux
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //state to manage form data
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        pic: null,
    })
    const [errorMessage, setErrorMessage] = useState("")
    const [isUploading, setIsUploading] = useState(false)
    console.log(formData)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }
    const handlePic = async (e) => {
        let pic = e.target.files[0];
        try {
            setIsUploading(true)
            if (!pic) {
                pic = defaultPic;
            }
            const formDataWithPic = new FormData();
            formDataWithPic.append("file", pic);
            formDataWithPic.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

            // make a POST request to Cloudinary to upload the image
            const response = await axios.post(CLOUDINARY_URL, formDataWithPic);

            // extract the image URL from the Cloudinary response
            console.log(response)
            const imageUrl = response.data.secure_url;

            // set the image URL in your form data
            setFormData({ ...formData, pic: imageUrl });
        } catch (error) {
            console.error("Error uploading image to Cloudinary:", error);
        } finally {
            setIsUploading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // clear previous error message
        setErrorMessage("");
        if (!formData.name || !formData.email || !formData.password || !formData.passwordConfirmation || !formData.pic) {
            setErrorMessage("Please fill in all required field")
            console.log("formData: ", formData)
            return;
        }
        if (formData.password !== formData.passwordConfirmation) {
            setErrorMessage("Password do not match")
            return
        }

        try {
            const data = await register(formData);
            if (data) {
                // dispatch the signupSuccess action with the user data if registration is successful
                dispatch(signupSuccess(data));
                // redirect to the login page after successful signup
                navigate("/login")
            }
            else {
                setErrorMessage("Registration failed. Please try again later.");
                dispatch(authFailure(errorMessage))
            }
        } catch (error) {
            console.error("Error during registration:", error);
            setErrorMessage("An error occurred during registration.");
            dispatch(authFailure(errorMessage));
        }
    }

    return (
        <div className="w-[480px] mx-auto mt-8 rounded-lg overflow-hidden bg-pearl-white text-slate-gray">
            <div className="py-8 px-12">
                <h2 className="text-2xl mb-4 font-bold">Create your account</h2>
                <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <label htmlFor="name" className="font-semibold">Name*</label>
                    <input type="text" className="rounded p-2 outline-none" name="name" value={formData.name} onChange={handleChange} required />
                    <label htmlFor="email" className="font-semibold">Email*</label>
                    <input type="email" className="rounded p-2 outline-none" name="email" value={formData.email} onChange={handleChange} required />
                    <label htmlFor="password" className="font-semibold">Password*</label>
                    <input type="password" className="rounded p-2 outline-none" name="password" value={formData.password} onChange={handleChange} required />
                    <label htmlFor="passwordConfirmation" className="font-semibold">Confirm Password*</label>
                    <input type="password" className="rounded p-2 outline-none" name="passwordConfirmation" value={formData.passwordConfirmation} onChange={handleChange} required />
                    <label htmlFor="pic" className="font-semibold">Upload your image</label>

                    <input type="file" name="pic" accept="image/*" onChange={handlePic} required />
                    <button className="bg-royal-purple p-2 rounded text-pearl-white" disabled={isUploading}>{isUploading ? "Uploading..." : "Register"}</button>
                    <div className="text-sm">* fields are mandatory</div>
                </form>
                {errorMessage && <div className="text-red-500">{errorMessage}</div>}
            </div>
        </div>
    )
}

export default Register
