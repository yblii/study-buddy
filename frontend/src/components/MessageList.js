import { TextBubble } from "./TextBubble";

export function MessageList(props) {
    return (
        <div className="flex-col pb-3 w-full h-4/5">
            {props.messages.map((msg) => (
                <TextBubble text={msg.parts[0]} 
                    isUser={msg.role === "user" ? true : false} 
                    key={msg.id} />
            ))}
        </div>
    )
}