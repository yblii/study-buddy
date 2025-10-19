export function AnalyticBlock({ title, content}) {
    return (
        <div className="bg-secondary">
            <h1>{title}</h1>
            <h2>{content}</h2>
        </div>
    );
}