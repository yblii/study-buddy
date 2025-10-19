import { Link } from "react-router-dom";
import { AnalyticsDucky } from "./AnalyticsDucky";

export function ExplanationsPage() {
    return (
        <div className="analytics-page h-screen w-screen flex justify-between p-20 gap-20">
            <div className="flex-3"> 
                <AnalyticsDucky />
            </div>
            <div className="flex-1"> 
                <div className="bg-secondary font-bold rounded-lg ring-bcolor ring-3 p-2 mb-2">
                    <h1 className="text-3xl">COMMUNITY BOARD</h1>
                </div>
                <div className="h-full bg-secondary rounded-lg ring-bcolor ring-3 p-3 text-lg">
                    <h2 className="mb-6">"Imagine a real tree. First, there is a "root" node, which holds a piece of data. It is connected to two (the binary part) branches, which each hold more data. The "left" branch holds a "smaller" or "lesser" value, determined by whatever you're storing, while the "right" node has a greater one."</h2>
                    <h2>"Imagine a real tree. First, there is a "root" node, which holds a piece of data. It is connected to two (the binary part) branches, which each hold more data. The "left" branch holds a "smaller" or "lesser" value, determined by whatever you're storing, while the "right" node has a greater one."</h2>
                </div>
            </div>
            <Link to="/home" className="bottom-10 left-25 bg-white border-white absolute border-4 bg-opacity-70 hover:bg-opacity-90 
                    text-gray-800 font-semibold text-center text-2xl w-1/4 py-2 px-4 rounded shadow">
                    RETURN HOME
            </Link>
        </div>
    )
}