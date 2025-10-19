import { useState } from "react";
import { handleLogin } from "./HandleLogin";
import { Link, useNavigate } from "react-router-dom";
 
export function LoginPage() {
    const [formData, setFormData] = useState(
        {
            email: "",
            password: ""
        }
    );

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {   
            await handleLogin(formData.email, formData.password);
        } catch(e) {
            console.log(e);
        }
        navigate("/home");
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    return (
        <div className = "flex items-center justify-center min-h-screen">
            <div className="bg-secondary p-12 rounded-lg gap-3 ring-bcolor ring-8 shadow-xl flex flex-col items-center z-10">
                <form onSubmit={handleSubmit}>
                    <h1 className="text-3xl font-extrabold text-textsec mb-6">LOGIN</h1>
                    <div className="form-section">
                        <input required type="email" placeholder="email@example.com" id="email" name="email" onChange={handleInputChange}></input>
                    </div>

                    <div className="form-section">
                        <input required type="password" placeholder="password" id="password" name="password" onChange={handleInputChange}></input>
                    </div>

                    <button type="submit" className="w-full">
                        LOGIN
                    </button>
                </form>
                <Link className="text-left w-full text-textp font-bold" to='/signup'>Sign Up</Link>
            </div>
                
        </div>
    )
}