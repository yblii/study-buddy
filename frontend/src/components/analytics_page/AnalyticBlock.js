export function AnalyticBlock({ title, content, classes }) {
    return (
        <div className={classes + " analytic-block flex items-center justify-between align-center shadow"}>
            <h1 className="inline text-textsec text-3xl font-bold">{title}</h1>
            <h2 className="inline text-3xl font-bold">{content}</h2>
        </div>
    );
}