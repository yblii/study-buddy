import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { AnalyticBlock } from "./AnalyticBlock";
import { AnalyticListBlock } from "./AnalyticListBlock";
import { AnalyticsDucky } from "./AnalyticsDucky";

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
        <div className="analytics-page h-screen w-screen flex justify-between p-20 gap-20">
            <div className="flex-3"> 
                <AnalyticsDucky />
            </div>
            
            <div className="flex-1 scrollbar overflow-y-auto 
                scrollbar-thumb-secondary scrollbar-track-primary">
                <div className="min-h-full p-6 flex flex-col justify-between gap-3 z-10">
                    {isLoading ? (
                <h1 className="text-3xl font-bold text-center pt-20">Loading analytics...</h1>
            ) : (
                analytics ? (
                    <div className="grid grid-cols-2 grid-rows-6 gap-4 p-6 col-span-3">
                        <AnalyticBlock title="OVERALL UNDERSTANDING" content={analytics.understanding_percentage + "%"}
                            classes="col-span-2 ring-bcolor ring-4" />
                        <AnalyticListBlock title="UNDERSTOOD CONCEPTS" content={analytics.understood_concepts}
                            classes="col-span-2 row-span-2 ring-bcolor ring-4" />
                        <AnalyticListBlock title="UNCERTAIN CONCEPTS" content={analytics.uncertain_concepts} 
                            classes="row-span-2 row-span-3 ring-bcolor ring-4" />
                        <AnalyticListBlock title="INCORRECT CONCEPTS" content={analytics.incorrect_concepts} 
                            classes="row-span-2 row-span-3 ring-bcolor ring-4" />
                    </div>

                ) : (
                    <h1>No analytics data available.</h1>
                )
            )}
                </div>
            </div>
            <Link to="/home" className="bottom-10 left-25 bg-white border-white absolute border-4 bg-opacity-70 hover:bg-opacity-90 
                text-gray-800 font-semibold text-center text-2xl w-1/4 py-2 px-4 rounded shadow">
                RETURN HOME
            </Link>
            <Link to="/community" className="top-10 right-22 bg-white border-white absolute border-4 bg-opacity-70 hover:bg-opacity-90 
                text-gray-800 font-semibold text-center text-2xl w-1/3 py-2 px-4 rounded shadow">
                COMMUNITY EXPLANATIONS
            </Link>
        </div>
    );
}