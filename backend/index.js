import express from 'express';
import cors from 'cors';
import {GoogleGenAI} from '@google/genai';
import Dotenv from 'dotenv';

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({apiKey : 'AIzaSyAY7wcjx3HanAkWKEjEI5jasoUFs9HRpvk'});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello, World!" });
});

app.post("/api/chat", async (req, res) => {
  const message = req.body.message;
  
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: message,
    thinkingBudget: 0,
  });
  res.json({message: response.text});
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
