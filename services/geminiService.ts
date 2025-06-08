
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Power, StoryChoice, StorySegment } from '../types';
import { SYSTEM_INSTRUCTION, INITIAL_STORY_PROMPT } from '../constants';

let ai: GoogleGenAI | null = null;

const getAI = (): GoogleGenAI => {
  if (!ai) {
    const apiKeyFromEnv = process.env.API_KEY;
    const apiKeyPreview = apiKeyFromEnv ? `${apiKeyFromEnv.substring(0, 5)}...${apiKeyFromEnv.slice(-4)}` : "undefined/empty";
    
    console.log("**********************************************************************");
    console.log(`GeminiService: Attempting to initialize GoogleGenAI.`);
    console.log(`GeminiService: API_KEY from process.env (preview): ${apiKeyPreview}`);

    if (!apiKeyFromEnv) {
      console.error("GeminiService: CRITICAL! API_KEY is missing or empty when getAI was called.");
      console.error("GeminiService: For local development, this means the API key was not set correctly in the <script id='dev-api-key-config'> block in index.html, or process.env.API_KEY is not set in your deployment environment.");
      throw new Error("API_KEY environment variable not set or empty. Cannot initialize Gemini AI.");
    }

    console.log("GeminiService: IMPORTANT! If you encounter a '400 - API key not valid' error shortly after this message, it means THE API KEY VALUE ITSELF IS THE PROBLEM.");
    console.log("GeminiService: Verify the following for the API key string you provided:");
    console.log("GeminiService: 1. It's copied correctly (no typos, not truncated).");
    console.log("GeminiService: 2. It's a valid Gemini API Key (not for another service).");
    console.log("GeminiService: 3. The 'Generative Language API' (or similar) is enabled in your Google Cloud project.");
    console.log("GeminiService: 4. Your Google Cloud project has no billing issues.");
    console.log("GeminiService: 5. The key has not expired and has no restrictive permissions.");
    console.log("GeminiService: For local development, double-check the API key value within the <script id='dev-api-key-config'> block in your index.html file.");
    console.log("**********************************************************************");

    try {
      ai = new GoogleGenAI({ apiKey: apiKeyFromEnv });
    } catch (e: any) {
      console.error("GeminiService: Error during 'new GoogleGenAI({ apiKey: ... })' instantiation:", e);
      throw new Error(`Failed to initialize GoogleGenAI SDK: ${e.message}`);
    }
  }
  return ai;
};

const parseJsonChoices = (jsonString: string): StoryChoice[] => {
  let cleanedJsonString = jsonString.trim();
  const fenceRegex = /^```(?:json)?\s*\n?(.*?)\n?\s*```$/s;
  const match = cleanedJsonString.match(fenceRegex);
  if (match && match[1]) {
    cleanedJsonString = match[1].trim();
  }

  try {
    const parsed = JSON.parse(cleanedJsonString);
    if (Array.isArray(parsed)) {
      return parsed.map((item: any, index: number) => ({
        id: item.id || `choice-${Date.now()}-${index}`,
        text: item.text || "Invalid choice text",
        power: Object.values(Power).includes(item.power as Power) ? item.power as Power : Power.None,
      }));
    }
    console.warn("Parsed JSON from Gemini is not an array:", parsed, "Raw string:", jsonString);
    return [];
  } catch (error) {
    console.error("Failed to parse JSON choices from Gemini:", error, "Raw string:", jsonString);
    if(!jsonString.includes("{") && !jsonString.includes("[")) { 
        const lines = jsonString.split('\n').map(s => s.trim().replace(/^- /, '')).filter(s => s.length > 0 && s.length < 100);
        if(lines.length > 0 && lines.length <=3) {
            console.log("Attempting fallback parsing for choices from simple list.");
            return lines.map((line, idx) => ({
                id: `fallback-${Date.now()}-${idx}`,
                text: line,
                power: Power.None 
            }));
        }
    }
    return [];
  }
};

export const generateInitialStory = async (): Promise<{ storyText: string; choices: StoryChoice[] }> => {
  const currentAi = getAI();
  
  console.log("GeminiService: Generating initial story segment...");
  const storyResponse: GenerateContentResponse = await currentAi.models.generateContent({
    model: "gemini-2.5-flash-preview-04-17",
    contents: INITIAL_STORY_PROMPT,
    config: { systemInstruction: SYSTEM_INSTRUCTION }
  });
  const initialStoryText = storyResponse.text;
  console.log("GeminiService: Initial story segment received.");

  const choicesPrompt = `Based on this opening: "${initialStoryText}". Generate 2-3 distinct choices for The Weaver.`;
  console.log("GeminiService: Generating initial choices...");
  const choicesResponse: GenerateContentResponse = await currentAi.models.generateContent({
    model: "gemini-2.5-flash-preview-04-17",
    contents: choicesPrompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
    }
  });
  console.log("GeminiService: Initial choices received. Raw text:", choicesResponse.text);
  const initialChoices = parseJsonChoices(choicesResponse.text);
  if (initialChoices.length === 0 && choicesResponse.text.length > 0) {
    console.warn("GeminiService: parseJsonChoices returned empty array for non-empty choices text from initial generation.");
  }

  return { storyText: initialStoryText, choices: initialChoices };
};

export const generateNextSegment = async (
  history: StorySegment[],
  userChoice: StoryChoice
): Promise<{ storyText: string; choices: StoryChoice[] }> => {
  const currentAi = getAI();

  const narrativeContext = history
    .slice(-5) 
    .map(s => (s.isUserChoice ? `User chose: "${s.text}" (Power: ${s.powerInFocus})` : `Story: "${s.text}"`))
    .join('\n');

  const storyPrompt = `Current narrative context:\n${narrativeContext}\n\nThe Weaver has just made the choice: "${userChoice.text}", which is aligned with the power/theme of ${userChoice.power}. Continue 'The Weaver's Journey' for one more segment (2-4 evocative sentences). This segment should reflect the chosen path and the associated power/theme. Ensure the narrative maintains coherence, explores The Weaver's internal state, and subtly mirrors the overall journey of transformation.`;
  
  console.log("GeminiService: Generating next story segment...");
  const storyResponse: GenerateContentResponse = await currentAi.models.generateContent({
    model: "gemini-2.5-flash-preview-04-17",
    contents: storyPrompt,
    config: { systemInstruction: SYSTEM_INSTRUCTION }
  });
  const newStoryText = storyResponse.text;
  console.log("GeminiService: Next story segment received.");

  const choicesPrompt = `The story has progressed to: "${newStoryText}". Generate 2-3 new distinct choices for The Weaver based on this.`;
  console.log("GeminiService: Generating new choices...");
  const choicesResponse: GenerateContentResponse = await currentAi.models.generateContent({
    model: "gemini-2.5-flash-preview-04-17",
    contents: choicesPrompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
    }
  });
  console.log("GeminiService: New choices received. Raw text:", choicesResponse.text);
  const newChoices = parseJsonChoices(choicesResponse.text);
  if (newChoices.length === 0 && choicesResponse.text.length > 0) {
     console.warn("GeminiService: parseJsonChoices returned empty array for non-empty choices text from next segment generation.");
  }
  
  return { storyText: newStoryText, choices: newChoices };
};
