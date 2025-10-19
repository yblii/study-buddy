export function AnalyticListBlock({ title, content, classes })  {
    return (
        <div className={classes + " analytic-block shadow"}>
            <h1 className="text-xl text-textsec font-bold">{title}</h1>
            <ul>
                {content.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}