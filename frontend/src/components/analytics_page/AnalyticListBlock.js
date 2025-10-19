export function AnalyticListBlock({ title, content })  {
    return (
        <div>
            <h1>{title}</h1>
            <ul>
                {content.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}