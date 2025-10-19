import { useEffect } from "react";
import { TextBubble } from "./TextBubble";
import { RandomDuck } from "./RandomDuck";

export function MessageList(props) {
    let messagesEnd = null;

    const scrollToBottom = () => {
        messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom();
    });

    return (
        <div className="flex-col pb-3 flex-1 w-full overflow-y-scroll scrollbar scrollbar-thumb-primary scrollbar-track-secondary">
            {props.messages.map((msg) => (
                <TextBubble text={msg.text} 
                    isUser={msg.role === "user" ? true : false} 
                    key={msg.id} />
            ))}
            {props.isThinking && 
                <TextBubble text={"..."} isUser={false} />
            }
            <div className="float-left clear-both" ref={(el) => { messagesEnd = el; }}>
            </div>
        </div>
    )
}