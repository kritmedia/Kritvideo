import { GoogleGenAI } from '@google/genai';

/**
 * Google AI Studio & Antigravity Gemini Client
 * Authenticated via GEMINI_API_KEY from environment.
 */
const getApiKey = (): string => {
  if (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GEMINI_API_KEY) {
    return (import.meta as any).env.VITE_GEMINI_API_KEY;
  }
  if (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) {
    return process.env.GEMINI_API_KEY;
  }
  return 'AQ.Ab8RN6IsizuaLp6svm8_j7fc6abElBdj9OKwknVE_3vzNXZkiA';
};

export const ai = new GoogleGenAI({
  apiKey: getApiKey(),
});

/**
 * Helper to generate video analysis, hooks, or creative copy using Gemini 2.0 Flash
 */
export async function generateContent(prompt: string, model: string = 'gemini-2.0-flash') {
  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error('Google AI Studio Gemini API Error:', error);
    throw error;
  }
}
