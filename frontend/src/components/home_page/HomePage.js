import { useEffect, useState } from "react";
import { useAuth } from "../authentication/AuthContext";
import { db } from "../../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";
import { ChatButton } from "./ChatButton";

export function HomePage() {
    const { currentUser } = useAuth();
    const [chats, setChats] = useState();

    const uid = currentUser ? currentUser.uid : null;

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const chatRef = collection(db, 'ducks');
                const chatQuery = query(chatRef, where('user_id', '==', uid));
                
                const snapshot = await getDocs(chatQuery);
                const loadedChats = snapshot.docs.map(doc => ({
                    id: doc.id,
                    name: doc.data().name,
                    topic: doc.data().topic,
                    educationLevel: doc.data().education_level,
                }));
                
                setChats(loadedChats);
            } catch(error) {
                console.error("Error fetching chat history:", error);
            }
        }

        fetchChats();
    }, []);

    return (
        <div className="h-full flex flex-col justify-center items-center gap-4">
            <h1 className="text-4xl font-bold text-shadow">PREVIOUS CHATS</h1>
            <div className="w-2/5 h-3/5 flex flex-col gap-4 overflow-y p-4 scrollbar overflow-y-auto 
                scrollbar-thumb-secondary scrollbar-track-primary">
                {chats ? (
                        chats.map((chat) => {
                            return <ChatButton chatData={chat}/>
                        })
                ) : ( <p>Loading Chats...</p> )}
            </div>
            <Link to="/create" className="top-4 left-4 bg-white border-white border-4 bg-opacity-70 hover:bg-opacity-90 
                    text-gray-800 font-semibold text-center text-2xl w-1/3 py-2 px-4 rounded shadow">
                    NEW CHAT
            </Link>
        </div>
    )
}