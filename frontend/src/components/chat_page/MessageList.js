import { TextBubble } from "./TextBubble";

export function MessageList(props) {
    return (
        <div className="flex-col pb-3 w-full overflow-y-auto scrollbar scrollbar-thumb-primary scrollbar-track-secondary">
            {props.messages.map((msg) => (
                <TextBubble text={msg.text} 
                    isUser={msg.role === "user" ? true : false} 
                    key={msg.id} />
            ))}
            {props.isThinking && 
                <TextBubble text={"..."} isUser={false} />
            }
        </div>
    )
}