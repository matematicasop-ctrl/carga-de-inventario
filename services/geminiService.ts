import { GoogleGenAI, Type } from "@google/genai";
import { SalesRecord, AiReport } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateBusinessReport = async (data: SalesRecord[]): Promise<AiReport> => {
  try {
    const prompt = `
      Act as a senior business analyst. Analyze the following sales data JSON.
      Generate a concise but professional executive report.
      
      Data: ${JSON.stringify(data)}

      Provide the output in strict JSON format.
      - "summary": A paragraph summarizing the overall performance.
      - "keyInsights": An array of strings with 3-4 bullet points regarding trends, top products, or concerns.
      - "recommendation": A strategic action item based on the data.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            keyInsights: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            recommendation: { type: Type.STRING }
          },
          required: ["summary", "keyInsights", "recommendation"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    const result = JSON.parse(text);
    
    return {
      ...result,
      generatedAt: new Date().toLocaleDateString()
    };

  } catch (error) {
    console.error("Error generating report:", error);
    throw error;
  }
};