export function TextBubble(props) {
    let classes = "";
    if(props.isUser) {
        classes = "justify-self-end bg-primary text-right rounded-br-none"; 
    } else {
        classes = "justify-self-start bg-white text-left rounded-bl-none"; 
    }

    classes += " rounded-xl p-1.5 pl-3 pr-3 mb-3 width-max max-w-sm";

    return (
        <div>
            <div className={classes}>
                {props.text}
            </div>
        </div>
    );
}