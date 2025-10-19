import { ChatWindow } from "./ChatWindow";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import { collection, query, orderBy, getDocs, doc, getDoc } from "firebase/firestore";
import { RandomDuck } from "./RandomDuck";
import { SaveChat } from "./SaveChat";
import { useParams } from "react-router-dom";

export function ChatPage() { 
    const [chatHistory, setChatHistory] = useState();
    const [chatMetadata, setChatMetadata] = useState(null);
    const { chatId } = useParams();

    useEffect(() => {
            const fetchChatHistory = async () => {
                try {
                    const chatRef = doc(db, 'ducks', chatId);
                    const chatSnapshot = await getDoc(chatRef);
                    
                    const data = chatSnapshot.data();
            
                    setChatMetadata({
                        name: data.name,
                        topic: data.topic,
                        educationLevel: data.education_level,
                    });

                    // 1. Define the path to the 'messages' subcollection
                    const messagesRef = collection(db, 'ducks', chatId, 'messages');
                    
                    // 2. Create a query: order messages chronologically
                    const messagesQuery = query(messagesRef, orderBy('timestamp', 'asc'));
                    
                    // 3. Use getDocs() for a single, one-time read
                    const querySnapshot = await getDocs(messagesQuery); 
                    
                    const loadedMessages = querySnapshot.docs.map(doc => ({
                        role: doc.data().role,
                        text: doc.data().text,
                        id: doc.data().timestamp
                    }));
    
                    setChatHistory(loadedMessages);
    
                } catch (error) {
                    console.error("Error fetching chat history:", error);
                }
            };
    
            fetchChatHistory();
        }, []);

    const navigate = useNavigate();

    const endChat = async () => {
        await SaveChat(chatHistory, chatId);
        navigate('/analytics', {state: { history: chatHistory }});
    }

    return (
        <div className="h-screen w-screen flex justify-between p-20 gap-20">
            {chatMetadata && chatHistory ? (
            <>
                <div className="flex-3"> 
                    {/* Pass data from state */}
                    <RandomDuck duckName={chatMetadata.name} />
                </div>
                <div className="flex-1">
                    <ChatWindow 
                        setHistory={setChatHistory} 
                        topic={chatMetadata.topic}           // Use state
                        educationLevel={chatMetadata.educationLevel} // Use state
                        chatLog={chatHistory}                       // Use state
                    />
                    
                    {/* ... button code ... */}
                </div>
            </>
            ) : (
                // Show a loading screen until BOTH chatMetadata AND chatHistory are loaded
                <div>Loading Conversation...</div>
            )}

            <button onClick={endChat} className="absolute top-4 right-20 p-2">
                END CHAT SESSION
            </button>
        </div>
    );
}