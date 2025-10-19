import { ChatWindow } from "./ChatWindow";
import { Link, useLocation } from "react-router-dom";
import {useState} from "react";
import { RandomDuck } from "./RandomDuck";

export function ChatPage() { 
    const [chatHistory, setChatHistory] = useState();

    const location = useLocation();
    const passedDuck = location.state.name || "Ducky";
    const topic = location.state.topic;
    const educationLevel = location.state.educationLevel;

    return (
        <div className="h-screen w-screen flex justify-between p-20 gap-20">
            <div className="flex-3"> 
                <RandomDuck duckName={passedDuck} />
            </div>
            <div className="flex-1">
                <ChatWindow setHistory={setChatHistory} name={passedDuck} topic={topic} educationLevel={educationLevel} />

                <Link to="/analytics" className="absolute top-4 right-4 bg-white bg-opacity-70 hover:bg-opacity-90 
                    text-gray-800 font-semibold py-2 px-4 rounded shadow" state={{ history: chatHistory }}>
                    Analytics
                </Link>

                <Link to="/" className="absolute top-4 left-4 bg-white bg-opacity-70 hover:bg-opacity-90 
                    text-gray-800 font-semibold py-2 px-4 rounded shadow">
                    New
                </Link>
            </div>
        </div>
    );
}