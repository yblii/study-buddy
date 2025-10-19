import { useState } from "react";
import { ChatInput } from "./ChatInput";
import { MessageList } from "./MessageList";
import axios from "axios";

export function ChatWindow({ setHistory }) {
    const [messages, setMessages] = useState([]);
    const [isThinking, setThinking] = useState(false);

    const sendMsg = async (msg) => {
        setThinking(true);
        if(!msg.trim()) return;

        const newMsg = { 
            role: "user", 
            text: msg,
            id: Date.now() 
        };
        setMessages(messages => [...messages, newMsg]);

        try {
            const resp = await axios.post("http://localhost:8080/api/chat", 
                { 
                    chatHistory: messages.map(m => (
                        { 
                            role: m.role, 
                            parts: [{ text: m.text }]
                        }
                    )),
                    userMessage: msg
                });
            
            const botMsg = { 
                role: "model", 
                text: resp.data.message,
                id: Date.now() + 1 
            };
            setMessages(messages => [...messages, botMsg]);
            setHistory([...messages, newMsg, botMsg]);
        } catch (error) { 
            console.error("Error sending message:", error);
        } finally {
            setThinking(false);
        }
    }

    return (
        <div className="bg-secondary p-6 h-5/6 rounded-lg flex flex-col justify-between gap-3 z-10
                ring-white ring-8 shadow-xl">
            <MessageList messages={messages} isThinking={isThinking}/>
            <ChatInput sendMsg={sendMsg} />
        </div>
    );
}