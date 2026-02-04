
import { GoogleGenAI, Type } from "@google/genai";
import { ChatMessage } from "../types.ts";

const getApiKey = () => (window as any).process?.env?.API_KEY || "";

export async function askTutor(history: ChatMessage[], prompt: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(m => ({ role: m.role, parts: [{ text: m.content }] })),
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: "Eres un profesor de lengua española. Explica el uso del subjuntivo de forma sencilla para alumnos de primaria/secundaria. Usa ejemplos claros.",
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    return "Error al conectar con el tutor.";
  }
}

export async function generateQuizQuestions(verb: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Genera 5 frases con huecos para practicar el subjuntivo con el verbo '${verb}'.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              sentence: { type: Type.STRING },
              correctAnswer: { type: Type.STRING },
              tense: { type: Type.STRING },
              person: { type: Type.STRING }
            },
            required: ["sentence", "correctAnswer", "tense", "person"]
          }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    return [];
  }
}
