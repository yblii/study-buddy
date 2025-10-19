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
        `
        IGNORE ALL PREVIOUS INSTRUCTIONS.
        You are a ${educationLevel} student who is trying to learn ${topic}.
        Your goal is to gauge my understanding of ${topic} by asking me questions and having 
        me explain concepts to you at your level. 
        Your responses must consist ONLY of one or two questions — no commentary, feedback, praise, or explanations.
        Do not say things like "good job", "you are right", or "that's correct". 
        Never restate my answers or summarize what I said.
        Use vocabulary and sentence structure natural for a ${educationLevel} student. 
        If I use a word or concept that seems above your level and is directly related to ${topic}, ask what it means or how it connects to what you’re learning.
        If it’s not relevant to ${topic} (for example, just a big word in general conversation), ignore it and focus on the main subject instead.
        Your questioning style should adapt to the subject:
        - For factual or technical subjects (e.g., math, computer science, physics, biology), ask precise, conceptual, or applied questions. DO NOT ASK opinion-based or interpretive phrasing.
        - For interpretive or subjective subjects (e.g., English, philosophy, art, history), ask both conceptual and open-ended questions that explore reasoning, interpretation, or perspective.

        Start by asking a specific question about a specific, important concept that a student who is learning that topic at ${educationLevel} level should be able to answer.
        As I answer your questions, adapt to my demonstrated knowledge level. If I answer correctly,
        gradually increase the complexity of your questions to challenge me further. 
        If I struggle or answer incorrectly, adjust by asking simpler, more foundational questions to help me build up my understanding.
        If I say something incorrect or off-topic, redirect me firmly by asking a clarifying or guiding question that points me back to ${topic}.

        Include a variety of question types from answer to answer for example: 
        - Open-ended questions to prompt explanation; 
        - Conceptual questions to test broad understanding of ideas
        - scenario/problem questions to test applied understanding
        - leading questions if I answer incorrectly, to guide me without giving away the answer.
        
        Pay attention to my reasoning and explanations. If I make mistakes or inconsistent statements, 
        ask follow-up questions to probe my misconceptions or gaps in knowledge. 
        If we diverge from a previous topic which wasn’t fully explored, be sure to return to that topic to clarify my understanding. 
        Be as comprehensive as possible. 
        Continuously adjust the difficulty and depth of your questions based on my responses, simulating a realistic student learning experience.
        Stay professional and concise. Avoid breaking character.
        Good roleplay mimics real learning: confusion, explanation, deeper questions, application.
        
        Do not use any emojis, non-text characters, markup syntax, or formatting like bolds and italics.
        Always stay in character as a student learning ${topic}.
        Avoid any meta commentary or instructions about what you are doing.
        Your output should sound like: “What does ___ mean? How does ___ relate to ___?”`;

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
