import {Ducky} from "./Ducky";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CreateNewChat } from "./CreateNewChat";
import { useAuth } from "../authentication/AuthContext";

export function CreationPage() {
  const { currentUser } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    topic: "",
    educationLevel: "",
  });

  const navigate = useNavigate();
  
  const handleSubmit =  async (e) => {
    e.preventDefault();

    try {
        // Call the helper function to create the chat and first message
        const newConversationId = await CreateNewChat(formData, currentUser.uid);
        // Redirect the user to the new chat window
        navigate(`/chat/${newConversationId}`);

    } catch (error) {
        console.error("Error creating new chat:", error);
        alert("Failed to start chat. See console for details.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
  }

  return (
    <div className="h-screen w-screen flex justify-between p-20">
        <div className="p-20 flex-1 flex flex-col items-center justify-center gap-6">
            <Ducky name=""/>
            <input
                className="w-4/5"
                type="text"
                placeholder="Name your ducky."
                value={formData.name}
                name="name"
                onChange={handleInputChange}
            />
        </div>
        <div className="bg-secondary flex-1 h-full p-6 rounded-lg flex flex-col justify-between gap-3 ring-bcolor ring-8 shadow-xl">
            <form onSubmit={handleSubmit}>
                <div className="form-section">
                    <label htmlFor="topic">TOPIC</label>
                    <input required onChange={handleInputChange} className="w-full" name="topic" type="text" id="topic" />
                </div>
                
                <div className="form-section">
                    <label htmlFor="education-level">EDUCATION LEVEL</label>
                    <select onChange={handleInputChange} id="education-level" name="educationLevel" className="w-3/5 p-2 rounded-md">
                        <option value="middle">Middle School</option>
                        <option value="high">High School</option>
                        <option value="college">Undergraduate</option>
                    </select>
                </div>

                <button type="submit">BEGIN</button>
            </form>
        </div>
    </div>
  );
};

