import { useState } from "react";
import { ChatInput } from "./ChatInput";
import { MessageList } from "./MessageList";

export function ChatWindow() {
    const [messages, setMessages] = useState([]);

    const sendMsg = (msg) => {
        if(!msg.trim()) return;

        const newMsg = { 
            role: "user", 
            parts: [msg],
            id: Date.now() 
        };
        setMessages(messages => [...messages, newMsg]);

        setTimeout(() => {
        const botMsg = { 
            role: "model1", 
            parts: ["Hello, I got your message!"], 
            id: Date.now() + 1 // Unique key/id for the bot
        };
        
        // 3. Add Bot Message, also using functional update
        setMessages(prevMessages => [...prevMessages, botMsg]);
    }, 1200);
    }

    return (
        <div className="bg-secondary p-6 h-4/5 w-2/5 rounded-lg">
            <MessageList messages={messages} />
            <ChatInput sendMsg={sendMsg} />
        </div>
    );
}