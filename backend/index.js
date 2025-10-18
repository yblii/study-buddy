import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';
import Dotenv from 'dotenv';
import bodyParser from 'body-parser';


const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello, World!" });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { chatHistory, userMessage } = req.body;

    chatHistory.push({
      role: "user",
      parts: [{ text: userMessage }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: history,
      thinkingBudget: 0
    });

    res.json({message: response.text});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Something went wrong. :( "});
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
