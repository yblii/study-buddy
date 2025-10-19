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
        if(isLoading){
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
    }

    useEffect(() => {
        fetchAnalytics();
    }, []);

    return (
        <div className="analytics-page grid grid-cols-5">
            <div className="duck-image-container col-span-2">

            </div>
            {isLoading ? (
                <p>Loading analytics...</p>
            ) : (
                analytics ? (
                    console.log(analytics),
                    console.log(analytics.understood_concepts),
                    <div className="grid grid-cols-2 grid-rows-6 gap-4 p-6 col-span-3">
                        <AnalyticBlock title="OVERALL UNDERSTANDING" content={analytics.understanding_percentage + "%"}
                            classes="col-span-2" />
                        <AnalyticListBlock title="UNDERSTOOD CONCEPTS" content={analytics.understood_concepts}
                            classes="col-span-2 row-span-2" />
                        <AnalyticListBlock title="UNCERTAIN CONCEPTS" content={analytics.uncertain_concepts} 
                            classes="row-span-2 row-span-3" />
                        <AnalyticListBlock title="INCORRECT CONCEPTS" content={analytics.incorrect_concepts} 
                            classes="row-span-2 row-span-3" />
                    </div>

                ) : (
                    <p>No analytics data available.</p>
                )
            )}
        </div>
    );
}