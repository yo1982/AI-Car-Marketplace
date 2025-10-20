// FIX: Import Type to be used in the responseSchema configuration.
import { GoogleGenAI, Type } from "@google/genai";
import { AiFilterCriteria } from '../types';

// FIX: Initialize GoogleGenAI according to guidelines, without type casting the API key.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAiCarSuggestions = async (userInput: string): Promise<AiFilterCriteria> => {
  if (!userInput) {
    throw new Error('User input cannot be empty.');
  }

  // FIX: Simplify the prompt since the desired JSON structure is now defined in the responseSchema.
  const prompt = `You are an expert car sales assistant. Analyze the user's request and extract structured filtering criteria for a car search. The user's request is: "${userInput}".

Only include fields if they are mentioned or strongly implied in the request.`;

  try {
    // FIX: Use responseSchema to ensure the model returns a well-formed JSON object, improving reliability.
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                type: { 
                  type: Type.STRING, 
                  description: 'The type of car. Possible values: "SUV", "Sedan", "Truck", "Coupe", "Convertible", "Hatchback".' 
                },
                make: { type: Type.STRING, description: 'The make of the car.' },
                minPrice: { type: Type.NUMBER, description: 'The minimum price.' },
                maxPrice: { type: Type.NUMBER, description: 'The maximum price.' },
                minYear: { type: Type.NUMBER, description: 'The minimum manufacturing year.' },
                features: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: 'List of features. Possible values: "fuel economy", "safety", "luxury", "off-road", "family-friendly".'
                },
              },
            }
        }
    });
    
    const jsonString = response.text;
    const parsedJson = JSON.parse(jsonString);

    // Basic validation
    const result: AiFilterCriteria = {};
    if (parsedJson.type && typeof parsedJson.type === 'string') result.type = parsedJson.type;
    if (parsedJson.make && typeof parsedJson.make === 'string') result.make = parsedJson.make;
    if (parsedJson.minPrice && typeof parsedJson.minPrice === 'number') result.minPrice = parsedJson.minPrice;
    if (parsedJson.maxPrice && typeof parsedJson.maxPrice === 'number') result.maxPrice = parsedJson.maxPrice;
    if (parsedJson.minYear && typeof parsedJson.minYear === 'number') result.minYear = parsedJson.minYear;
    if (Array.isArray(parsedJson.features)) result.features = parsedJson.features.filter((f: any) => typeof f === 'string');
    
    return result;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get AI recommendations. Please try again.");
  }
};