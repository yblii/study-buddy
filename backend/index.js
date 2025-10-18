import express from 'express';
import cors from 'cors';
import {GoogleGenAI} from '@google/genai';
import Dotenv from 'dotenv';

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI();

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello, World!" });
});

app.get("/api/chat", async (req, res) => {
  const message = req.query.message;
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: message,
    thinkingBudget: 0,
  });
  res.send(response.text);
  console.log(response.text);
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
