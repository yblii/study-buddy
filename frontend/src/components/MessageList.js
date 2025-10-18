import { TextBubble } from "./TextBubble";

export function MessageList(props) {
    return (
        <div className="message-list">
            {props.messages.map((msg) => (
                <TextBubble text={msg.parts[0]} 
                    isUser={msg.role === "user" ? true : false} 
                    key={msg.id} />
            ))}
        </div>
    )
}