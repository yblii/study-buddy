export function TextBubble(props) {
    return (
        <div>
            <p className={props.isUser ? "user-msg" : "bot-msg"}>
                {props.text}
            </p>
        </div>
    );
}