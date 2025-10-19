import { useState } from "react";
import { handleSignUp } from "./HandleSignUp";
import { Link, useNavigate } from "react-router-dom";
 
export function SignUpPage() {
    const [formData, setFormData] = useState(
        {
            email: "",
            password: ""
        }
    );

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleSignUp(formData.email, formData.password);
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
                <h1>SIGN UP</h1>
                <div class="form-section">
                    <input required type="email" placeholder="email@example.com" id="email" name="email" onChange={handleInputChange}></input>
                </div>

                <div class="form-section">
                    <input required type="password" id="password" name="password" onChange={handleInputChange}></input>
                </div>

                <button type="submit">
                    CREATE ACCOUNT
                </button>
            </form>
            <Link to='/login'>Login</Link>
        </div>
    )
}