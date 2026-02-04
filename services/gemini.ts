
import { GoogleGenAI, Type } from "@google/genai";
import { ChatMessage } from "../types.ts";

export async function askTutor(history: ChatMessage[], prompt: string) {
  try {
    const apiKey = (globalThis as any).process?.env?.API_KEY || "";
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(m => ({ role: m.role, parts: [{ text: m.content }] })),
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: `Eres un profesor experto de español llamado 'Profe Conjugación'. 
        Tu misión es ayudar a estudiantes españoles de primaria y secundaria a entender la conjugación de los verbos en Indicativo y Subjuntivo. 
        Explica las reglas de los tiempos verbales (simples y compuestos) de forma clara y adaptada para nativos.
        Sé paciente, amable y usa ejemplos claros. Si el estudiante comete un error gramatical, corrígelo con pedagogía.
        Responde exclusivamente en español.`,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Lo siento, mi conexión con el servidor de gramática ha fallado. ¿Puedes intentarlo de nuevo?";
  }
}

export async function generateQuizQuestions(verb: string) {
  try {
    const apiKey = (globalThis as any).process?.env?.API_KEY || "";
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Genera 5 frases de práctica para los tiempos del Indicativo y Subjuntivo usando el verbo '${verb}'.
      Cada frase debe tener un hueco '_____' para el verbo conjugado.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              sentence: { type: Type.STRING, description: "La frase con un hueco '_____' para el verbo." },
              correctAnswer: { type: Type.STRING, description: "La forma conjugada correcta." },
              tense: { type: Type.STRING, description: "El tiempo verbal (ej. Pretérito Perfecto Simple)." },
              person: { type: Type.STRING, description: "La persona gramatical (ej. tú)." }
            },
            required: ["sentence", "correctAnswer", "tense", "person"]
          }
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error generating quiz:", error);
    return [];
  }
}
