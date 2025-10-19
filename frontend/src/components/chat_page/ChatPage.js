import { ChatWindow } from "./ChatWindow";
import { Link } from "react-router-dom";
import React from "react";

export function ChatPage() { 
    const [chatHistory, setChatHistory] = React.useState();

    return (
        <div className="p-6 w-screen h-screen grid grid-cols-5 items-center">
            <div class="col-span-2">

            </div>
            <div class="col-span-3">
                <ChatWindow setHistory={setChatHistory}/>
                
                <Link to="/analytics" className="absolute top-4 right-4 bg-white bg-opacity-70 hover:bg-opacity-90 
                    text-gray-800 font-semibold py-2 px-4 rounded shadow" state={{ history: chatHistory }}>
                    Analytics
                </Link>
            </div>
        </div>
    );
}