import express from 'express';
import cors from 'cors';
import {GoogleGenAI} from '@google/genai';
import Dotenv from 'dotenv';

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({apiKey:GEMINI_API_KEY});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello, World!" });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
