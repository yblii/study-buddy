import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export const CreateNewChat = async (formData, uid) => {

    function parseEducationLevel(level) {
        if(level === "middle") return 0;
        if(level === "high") return 1;
        if(level === "college") return 2;
        return 1; // default to middle school
    };

    const chatData = {
        user_id: uid,
        name: formData.name,
        topic: formData.topic,
        education_level: parseEducationLevel(formData.educationLevel),
        created_at: Date.now(),
        last_updated: Date.now()
    };

    const newChatRef = await addDoc(collection(db, 'ducks'), chatData);

    const newChatId = newChatRef.id;

    await addDoc(collection(db, 'ducks', newChatId, 'messages'), {
        role: 'user',
        text: `Hi ${chatData.name}, let's talk about ${chatData.topic}`,
        timestamp: Date.now(),
    });

    return newChatId;
}