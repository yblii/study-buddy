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
        <div>
            <form onSubmit={handleSubmit}>
                <h1>LOGIN</h1>
                <div className="form-section">
                    <input required type="email" placeholder="email@example.com" id="email" name="email" onChange={handleInputChange}></input>
                </div>

                <div className="form-section">
                    <input required type="password" id="password" name="password" onChange={handleInputChange}></input>
                </div>

                <button type="submit">
                    CREATE ACCOUNT
                </button>
            </form>
            <Link to='/signup'>Sign Up</Link>
        </div>
    )
}