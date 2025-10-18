export function TextBubble(props) {
    let classes = "";
    if(props.isUser) {
        classes = "justify-self-end bg-primary text-right"; 
    } else {
        classes = "justify-self-start bg-white text-left"; 
    }

    classes += " rounded-md p-1 pl-2 pr-2";

    return (
        <div>
            <p className={props.isUser ? "user-msg" : "bot-msg"}>
                {props.text}
            </p>
        </div>
    );
}