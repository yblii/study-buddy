import React, { useState } from "react";
import { LuSend } from "react-icons/lu";


export function NameInputBox({ onSubmit }) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit(name);
      setName(""); // Clear input after submission
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="flex items-center space-x-2 mt-4">
      <input
        type="text"
        placeholder="Name your ducky."
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={handleKeyPress}
        className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button className="p-2 rounded bg-primary" onClick={handleSubmit}>
        <LuSend color="white" className="text-2xl stroke-600" />
      </button>
    </div>
  );
};
