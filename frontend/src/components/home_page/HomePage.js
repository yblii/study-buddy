import { useEffect, useState } from "react";
import { useAuth } from "../authentication/AuthContext";
import { db } from "../../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";

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
        <div>
            
            <Link to="/" className="absolute top-4 left-4 bg-white bg-opacity-70 hover:bg-opacity-90 
                    text-gray-800 font-semibold py-2 px-4 rounded shadow">
                    New
            </Link>
        </div>
    )
}