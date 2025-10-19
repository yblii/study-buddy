import { useNavigate } from "react-router-dom"

export function ChatButton({ chatData }) {
    const navigate = useNavigate();
    const handleClick = (e) => {
        navigate(`/chat/${chatData.id}`);
    }

    const parseLevel = (num) => {
        if(num === 0) return "Middle School";
        if(num === 0) return "High School";
        if(num === 0) return "Undergraduate";
        return "Middle School";
    }

    return (
        <div className="hover:scale-[102%] shadow bg-secondary flex flex-row justify-between items-center gap-4 rounded-xl p-4 pl-8 ring-bcolor ring-4 hover:cursor-pointer" onClick={handleClick}>
            <div className="flex flex-row gap-4">
                <div className="chat-btn-section">
                    <h1 className="text-xl font-bold mb-2">NAME</h1>
                    <h1 className="text-xl font-bold">TOPIC</h1>
                    <h1 className="text-xl font-bold">LEVEL</h1>
                </div>
                <div className="chat-btn-section">
                    <p className="text-xl font-semibold text-textsec mb-2">{chatData.name}</p>
                    <p className="text-xl font-semibold text-textsec">{chatData.topic}</p>
                    <p className="text-xl font-semibold text-textsec">{parseLevel(chatData.educationLevel)}</p>
                </div>

            </div>
            <div className="justify-self-end">
                <img src={require("../../assets/ducks/duck_icon.png")} className="w-32" alt="duck icon" />
            </div>
        </div>
    )
}