import { useState } from "react";
import { ChatInput } from "./ChatInput";
import { MessageList } from "./MessageList";
import axios from "axios";

export function ChatWindow() {
    const [messages, setMessages] = useState([]);

    const sendMsg = async (msg) => {
        if(!msg.trim()) return;

        const newMsg = { 
            role: "user", 
            parts: [msg],
            id: Date.now() 
        };
        setMessages(messages => [...messages, newMsg]);
        const resp = await axios.post("http://localhost:5000/api/chat", { message: msg });
        
        const botMsg = { 
            role: "bot", 
            parts: [resp.data.message],
            id: Date.now() + 1 
        };
        setMessages(messages => [...messages, botMsg]);
    }

    return (
        <div className="bg-secondary p-6 h-4/5 w-2/5 rounded-lg">
            <MessageList messages={messages} />
            <ChatInput sendMsg={sendMsg} />
        </div>
    );
}