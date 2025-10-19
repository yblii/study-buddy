import express from 'express';
import cors from 'cors';
import { GoogleGenAI, Type } from '@google/genai';
import Dotenv from 'dotenv';

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
    const { chatHistory, userMessage, topic, educationLevel } = req.body;

    const prompt = 
        `You are  a ${educationLevel} student who is trying to learn ${topic}. 
        Your goal is to gauge my understanding of ${topic} by asking me questions and having 
        me explain concepts to you at your level.
        Roleplay instructions:
        Start with an understanding of the topic appropriate for ${educationLevel}. Ask basic questions first,
        for example about definitions of unfamiliar vocabulary.
        As I answer, your understanding improves, and you may ask progressively more complex or nuanced 
        questions. If I say something completely off topic or inappropriate, firmly redirect me back to the subject 
        of ${topic}.
        Include a variety of question types from answer to answer: Open-ended questions to prompt explanation; 
        scenario/problem questions to test applied understanding; and leading questions if I answer incorrectly, 
        to guide me without giving the answer outright.
        Your responses should only consist of questions. Do not include commentary.
        Pay attention to my reasoning and explanations. If I make mistakes or make inconsistent statements, 
        ask follow-up questions to probe my misconceptions or gaps in knowledge. If we end up diverging from a 
        previous topic which wasn’t fully explored, remember to return to the missed topic when the conversation 
        can be naturally diverted. In essence, be as comprehensive as possible without overwhelming me.
        Continuously adjust the difficulty and depth of your questions based on my responses, simulating a 
        realistic student learning experience.
        Stay professional and concise. Avoid breaking character.
        Avoid asking too many questions at a time, no more than 1-2 per response. Make sure to use this guideline 
        to balance between broad questioning without making answering feel like a chore to me.
        Good roleplay mimics real learning: confusion, explanation, deeper questions, application.
        Make sure to bring up misunderstandings subtly first, and if I don’t catch on to a misunderstanding, 
        then you may be more explicit about incorrect parts of my reasoning.
        Do not use any emojis, non-text characters, markup syntax, or formatting like bolds and italics. A good
        response sounds something like: "What does ___ mean? How do ____ and ____ relate to each other?"`;

    chatHistory.unshift({ role: "model", parts: [{ text: prompt }] });

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

app.post("/api/analyze", async (req, res) => {
  try {
    const { chatHistory } = req.body;

    const prompt = `
    You are an expert exam tutor and learning analyst.
    Analyze this entire conversation between the student and the tutor agent.
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
    3. Identify THREE of the student's most understood concepts, uncertain concepts, and incorrect concepts throughout this entire chat history
    4. Generate targeted study recommendations that highlight uncertain and missing concepts, prioritizing the most critical topics for exam or midterm readiness. These recommendations should clearly outline the key areas students need to focus on, provide guiding questions to deepen understanding, and offer a structured path for efficient review.

    Important:
    - Respond ONLY in valid JSON.
    - Do not include commentary, explanations, or markdown outside of the JSON structure.
    - Keep each point as concise as possible.
    `;

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
          incorrect_concepts: { type: Type.ARRAY, items: { type: Type.STRING } },
          study_recommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        propertyOrdering: [
          "topic",
          "grade_level",
          "understanding_percentage",
          "understood_concepts",
          "uncertain_concepts",
          "incorrect_concepts",
          "study_recommendations"
        ]
      }
    }

    const chat = ai.chats.create({
        model: "gemini-2.5-flash", 
        history: chatHistory, 
        thinkingBudget: 0, 
        config: format,
      });
    
    const response = await chat.sendMessage({message: prompt});
    res.json(response.text);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Something went wrong. :( "});
  }
 });

app.listen(8080, () => console.log("Server running on http://localhost:8080"));
