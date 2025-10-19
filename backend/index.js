import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello, World!" });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { chatHistory, userMessage } = req.body;
    
    const chat = ai.chats.create({
        model: "gemini-2.5-flash",
        history: chatHistory
    });

    const response = await chat.sendMessage({message: userMessage});
    res.json({message: response.text});

  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Something went wrong. :( "});
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
