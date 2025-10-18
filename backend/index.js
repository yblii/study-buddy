import express from 'express';
import cors from 'cors';
import {GoogleGenAI} from '@google/genai';
import Dotenv from 'dotenv';
import bodyParser from 'body-parser';


const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({apiKey:GEMINI_API_KEY});
const model = ai.getGenerativeModel({model : "gemini-2.5-flash"});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello, World!" });
});

app.post("/api/chat", async (req, res) => {
    try {
        const {chatHistory, userMessage} = req.body;

        chatHistory.push({
            role: "user",
            parts: [{ text: userMessage }]
        });

        const chat = model.startChat({
            history: chatHistory
        });

        const result = await chat.sendMessage(userMessage);
    }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
