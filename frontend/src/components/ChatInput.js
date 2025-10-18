import { useState } from "react"
import { LuSend } from "react-icons/lu";

export function ChatInput(props) {
    const [input, setInput] = useState("");

    function handleSubmit(e) {
        props.sendMsg(input);
        setInput("");
    }

    return (
        <div className="input-bar w-full flex gap-4 justify-center">
            <input 
                type="text" placeholder="type here..." 
                className="p-2 rounded w-4/5"
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                onSubmit={handleSubmit}>
            </input>
            <button className="p-2 rounded bg-primary" onClick={handleSubmit}>
                <LuSend color="white" className="text-2xl stroke-600" />
            </button>
        </div>
    )
}