import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnalyticBlock } from "./AnalyticBlock";
import { AnalyticListBlock } from "./AnalyticListBlock";

export function AnalyticsPage() {
    const location = useLocation();
    const history = location.state?.history || [];

    const [analytics, setAnalytics] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const fetchAnalytics = async () => {
        try {
            const resp = await axios.post("http://localhost:8080/api/analyze", 
                {
                    chatHistory: history.map(m => (
                        { 
                            role: m.role, 
                            parts: [{ text: m.text }]
                        }
                    ))
                });
            setAnalytics(JSON.parse(resp.data));
        } catch (error) {
            console.error("Error fetching analytics:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAnalytics();
    }, []);

    return (
        <div className="analytics-page">
            {isLoading ? (
                <p>Loading analytics...</p>
            ) : (
                analytics ? (
                    console.log(analytics),
                    console.log(analytics.understood_concepts),
                    <div>
                        <AnalyticBlock title="Understanding Percentage" content={analytics.understanding_percentage + "%"}/>
                        <AnalyticListBlock title="Understood Concepts" content={analytics.understood_concepts} />
                        <AnalyticListBlock title="Uncertain Concepts" content={analytics.uncertain_concepts} />
                        <AnalyticListBlock title="Incorrect Concepts" content={analytics.incorrect_concepts} />
                    </div>

                ) : (
                    <p>No analytics data available.</p>
                )
            )}
        </div>
    );
}