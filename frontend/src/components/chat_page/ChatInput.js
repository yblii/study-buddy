import { useState } from "react"
import { LuSend } from "react-icons/lu";

export function ChatInput(props) {
    const [input, setInput] = useState("");

    function handleSubmit(e) {
        props.sendMsg(input);
        setInput("");
    }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

    return (
        <div className="input-bar w-full flex gap-4 justify-center">
            <input 
                type="text" placeholder="type here..." 
                className="p-2 rounded-lg w-full"
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                onSubmit={handleSubmit}>
            </input>
            <button className="p-2 rounded-lg bg-primary border-4 border-black/20" onClick={handleSubmit}>
                <LuSend className="text-2xl stroke-600" color="white" />
            </button>
        </div>
    )
}