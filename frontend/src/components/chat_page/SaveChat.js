import { db } from "../../firebase/firebase";
import { collection, getDoc, doc, writeBatch } from "firebase/firestore";

export async function SaveChat(chatHistory, chatId) {
    const messagesCollectionRef = collection(db, 'ducks', chatId, 'messages');

    const chatDocRef = doc(db, 'ducks', chatId);
    const docSnap = await getDoc(chatDocRef);
    const newMsgs = chatHistory.filter(msg => msg.id > docSnap.data().last_updated);

    const batch = writeBatch(db);
    newMsgs.forEach(msg => {
        const newDocRef = doc(messagesCollectionRef);
        batch.set(newDocRef, {
            role: msg.role,
            text: msg.text,
            timestamp: msg.id,
        });
    });

    batch.update(chatDocRef, {
        last_updated: Date.now()
    });

    try {
        await batch.commit();
    } catch (e) {
        console.error("Batch commit failed:", e);
    }
}