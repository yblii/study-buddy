import { ChatWindow } from "./ChatWindow";
import { Link, useLocation } from "react-router-dom";
import React from "react";
import { Ducky } from "../creation_page/Ducky";

export function ChatPage() { 
    const [chatHistory, setChatHistory] = React.useState();
    const location = useLocation();
    const {passedDuck} = location.state || "Ducky";

    return (
        <div>
              
     
            <Ducky name={passedDuck}/> 
            <ChatWindow setHistory={setChatHistory}/>

            <Link to="/analytics" className="absolute top-4 right-4 bg-white bg-opacity-70 hover:bg-opacity-90 
                text-gray-800 font-semibold py-2 px-4 rounded shadow" state={{ history: chatHistory }}>
                Analytics
            </Link>

            <Link to="/new" className="absolute top-4 left-4 bg-white bg-opacity-70 hover:bg-opacity-90 
                text-gray-800 font-semibold py-2 px-4 rounded shadow">
                New
            </Link>
            
        </div>



    );
}