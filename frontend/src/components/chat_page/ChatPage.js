import { ChatWindow } from "./ChatWindow";
import { Link } from "react-router-dom";
import React from "react";

export function ChatPage() { 
    const [chatHistory, setChatHistory] = React.useState();

    return (
        <div className="bg-bg bg-repeat bg-contain h-screen flex items-center 
                justify-center">
            <ChatWindow setHistory={setChatHistory}/>
            <div className='backdrop-saturate-[.85]  absolute top-0 left-0 w-full h-full'></div>

            <Link to="/analytics" className="absolute top-4 right-4 bg-white bg-opacity-70 hover:bg-opacity-90 
                text-gray-800 font-semibold py-2 px-4 rounded shadow" state={{ history: chatHistory }}>
                Analytics
            </Link>
        </div>
    );
}