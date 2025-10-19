import express from 'express';
import cors from 'cors';
import { GoogleGenAI, Type} from '@google/genai';
import Dotenv from 'dotenv';
import bodyParser from 'body-parser';


const app = express();
app.use(cors());
app.use(express.json());

Dotenv.config();

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello, World!" });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { chatHistory, userMessage } = req.body;
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      history: chatHistory,
    })

    const response = await chat.sendMessage(userMessage);

    res.json({message: response.text});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Something went wrong. :( "});
  }
});

app.post("/api/analyze", async (req, res) => {
  try {
    const { chat_history } = req.body;

    const prompt = `
    You are an expert exam tutor and learning analyst.
    Analyze the entire conversation between the student and the tutor agent.
    The student is explaining a topic in as much detail as they can, and you, the tutor agent is asking increasingly complex questions to reveal the student’s knowledge gaps and uncertainty.

    Your task now is to:
    1. Read and analyze the entire dialogue carefully.
      - Consider what the student explains clearly and accurately.
      - Consider what the student explains incorrectly, vaguely or partially. 
      - Consider how they respond to follow-up questions of increasing complexity.
      - Identify signs of hesitation, vague or incomplete reasoning, or incorrect answers.
      - Pay close attention to whether they can handle more advanced questions.
    2. Based on this analysis, estimate the student's final understanding percentage (0–100).
      - Consider both content accuracy and confidence as reflected in their language and ability to handle deeper questions.
    3. Identify the understood concepts, uncertain concepts, missing concepts throughout this entire chat history
    4. Generate targeted study recommendations that highlight uncertain and missing concepts, prioritizing the most critical topics for exam or midterm readiness. These recommendations should clearly outline the key areas students need to focus on, provide guiding questions to deepen understanding, and offer a structured path for efficient review.

    Important:
    - Respond ONLY in valid JSON.
    - Do not include commentary, explanations, or markdown outside of the JSON structure.
    `;

    chat_history.push({
      role: "user",
      parts: [{ text: prompt }]
    });

    const format = {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          topic: { type: Type.STRING },
          grade_level: { type: Type.STRING },
          understanding_percentage: { type: Type.NUMBER },
          understood_concepts: { type: Type.ARRAY, items: { type: Type.STRING } },
          uncertain_concepts: { type: Type.ARRAY, items: { type: Type.STRING } },
          missing_concepts: { type: Type.ARRAY, items: { type: Type.STRING } },
          study_recommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        propertyOrdering: [
          "topic",
          "grade_level",
          "understanding_percentage",
          "understood_concepts",
          "uncertain_concepts",
          "missing_concepts",
          "study_recommendations"
        ]
      }
    }

    const analysis = await ai.models.generateContent({
        model: "gemini-2.5-flash", 
        contents: prompt, 
        thinkingBudget: 0, 
        config: format,
      });
    
    const response = analysis.text;
    res.json(JSON.parse(response));
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Something went wrong. :( "});
  }
 });

app.listen(8080, () => console.log("Server running on http://localhost:8080"));
