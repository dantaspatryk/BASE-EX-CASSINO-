import { GoogleGenAI } from "@google/genai";
import type {
  GeneratedSignal,
  PayoutState,
  HistorySignal,
  CustomStrategyConfig,
  AiProfile,
  CrashResult,
} from '../types';

// Import services for each AI profile
import { getBlackAiPrompt, getBlackAiSchema } from '../ai-profiles/black/blackAiService';
import { getBlackAiFallback } from '../ai-profiles/black/blackAiSecurity';
import { getBlueAiPrompt, getBlueAiSchema } from '../ai-profiles/blue/blueAiService';
import { getBlueAiFallback } from '../ai-profiles/blue/blueAiSecurity';
import { getBoomAiPrompt, getBoomAiSchema } from '../ai-profiles/boom/boomAiService';
import { getBoomAiFallback } from '../ai-profiles/boom/boomAiSecurity';
import { getDiamondAiPrompt, getDiamondAiSchema } from '../ai-profiles/diamond/diamondAiService';
import { getDiamondAiFallback } from '../ai-profiles/diamond/diamondAiSecurity';
import { getNineAiPrompt, getNineAiSchema } from '../ai-profiles/nine/nineAiService';
import { getNineAiFallback } from '../ai-profiles/nine/nineAiSecurity';
import { getSevenGoldAiPrompt, getSevenGoldAiSchema } from '../ai-profiles/sevenGold/sevenGoldAiService';
import { getSevenGoldAiFallback } from '../ai-profiles/sevenGold/sevenGoldAiSecurity';
import { getGoldAiPrompt, getGoldAiSchema } from '../ai-profiles/gold/goldAiService';
import { getGoldAiFallback } from '../ai-profiles/gold/goldAiSecurity';
import { getMatrixAiPrompt, getMatrixAiSchema } from '../ai-profiles/matrix/matrixAiService';
import { getMatrixAiFallback } from '../ai-profiles/matrix/matrixAiSecurity';
import { getShowtimeAiPrompt, getShowtimeAiSchema } from '../ai-profiles/showtime/showtimeAiService';
import { getShowtimeAiFallback } from '../ai-profiles/showtime/showtimeAiSecurity';
import { getAceAiPrompt, getAceAiSchema } from '../ai-profiles/ace/aceAiService';
import { getAceAiFallback } from '../ai-profiles/ace/aceAiSecurity';
import { validateAndAdjustSignal } from './strategyValidationService';


const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateSignal = async (
  gameName: string,
  gameCategory: string,
  payoutState: PayoutState,
  history: HistorySignal[],
  aiProfile: AiProfile,
  customStrategy?: CustomStrategyConfig,
  realTimeHistory?: CrashResult[],
): Promise<GeneratedSignal> => {
    
  try {
    let prompt: string;
    let schema: any;
    let responseType: 'slot' | 'crash' | 'live' | 'matrix';
    let config: any = {
      responseMimeType: "application/json",
    };
  
    switch (aiProfile) {
        case 'Black':
            prompt = getBlackAiPrompt(gameName, gameCategory, payoutState, history);
            schema = getBlackAiSchema();
            responseType = 'slot';
            break;
        case 'Blue':
            prompt = getBlueAiPrompt(gameName, gameCategory, payoutState, history);
            schema = getBlueAiSchema();
            responseType = 'slot';
            break;
        case 'Boom':
            prompt = getBoomAiPrompt(gameName, gameCategory, payoutState, history);
            schema = getBoomAiSchema();
            responseType = 'slot';
            break;
        case 'Diamond':
            prompt = getDiamondAiPrompt(gameName, gameCategory, payoutState, history, customStrategy!);
            schema = getDiamondAiSchema();
            responseType = 'slot';
            break;
        case 'Seven Gold':
            prompt = getSevenGoldAiPrompt(gameName, gameCategory, payoutState, history, realTimeHistory);
            schema = getSevenGoldAiSchema();
            responseType = 'crash';
            break;
        case 'Nine': 
            prompt = getNineAiPrompt(gameName, gameCategory, payoutState, history);
            schema = getNineAiSchema();
            responseType = 'live';
            break;
        case 'Gold':
            prompt = getGoldAiPrompt(gameName, gameCategory, payoutState, history);
            schema = getGoldAiSchema();
            responseType = 'slot';
            break;
        case 'Matrix':
            prompt = getMatrixAiPrompt(gameName, gameCategory, payoutState, history);
            schema = getMatrixAiSchema();
            responseType = 'matrix';
            break;
        case 'Showtime':
            prompt = getShowtimeAiPrompt(gameName, gameCategory, payoutState, history);
            schema = getShowtimeAiSchema();
            responseType = 'live';
            break;
        case 'Ace':
            prompt = getAceAiPrompt(gameName, gameCategory, payoutState, history);
            schema = getAceAiSchema();
            responseType = 'live';
            break;
        default: 
            // Fallback to Black AI if profile is unknown
            prompt = getBlackAiPrompt(gameName, gameCategory, payoutState, history);
            schema = getBlackAiSchema();
            responseType = 'slot';
            break;
    }
    
    config.responseSchema = schema;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: config,
    });

    const jsonText = response.text?.trim();
    if (!jsonText) {
        throw new Error("Gemini API returned an empty response.");
    }
    
    const parsed = JSON.parse(jsonText);

    // Basic validation
    if (parsed.error || !parsed.payingTimeSuggestion) {
        console.error(`Gemini API returned an invalid signal structure or an error for ${aiProfile}:`, parsed);
        throw new Error("Invalid signal structure in API response.");
    }
    
    let result = { ...parsed, aiProfile, signalType: responseType } as GeneratedSignal;

    // --- NEW TACTICAL VALIDATION PROTOCOL ---
    // This security layer validates and adjusts the signal for time feasibility and phase change risks.
    result = validateAndAdjustSignal(result, payoutState);
    // ----------------------------------------

    // Fallback for malformed time suggestion (runs after adjustment as a final safety net)
    const timeRegex = /^\d{2}:\d{2} - \d{2}:\d{2}$/;
    if (!timeRegex.test(result.payingTimeSuggestion)) {
        const startTime = new Date(Date.now() + 2 * 60000);
        const endTime = new Date(startTime.getTime() + 5 * 60000);
        const format = (d: Date) => d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        result.payingTimeSuggestion = `${format(startTime)} - ${format(endTime)}`;
    }

    return result;

  } catch (error) {
    console.warn(`Gemini API error for ${aiProfile}. Activating Security Protocol.`, error);
    // Call the specific fallback for the requested AI profile
    switch (aiProfile) {
        case 'Black':
            return getBlackAiFallback(payoutState, gameName);
        case 'Blue':
            return getBlueAiFallback(payoutState, gameName);
        case 'Boom':
            return getBoomAiFallback(payoutState, gameName);
        case 'Diamond':
            return getDiamondAiFallback(payoutState, gameName, customStrategy);
        case 'Seven Gold':
            return getSevenGoldAiFallback(payoutState, gameName);
        case 'Nine':
            return getNineAiFallback(payoutState, gameName);
        case 'Gold':
            return getGoldAiFallback(payoutState, gameName);
        case 'Matrix':
            return getMatrixAiFallback(payoutState, gameName);
        case 'Showtime':
            return getShowtimeAiFallback(payoutState, gameName);
        case 'Ace':
            return getAceAiFallback(payoutState, gameName);
        default:
            return getBlackAiFallback(payoutState, gameName); // Default to safest fallback
    }
  }
};
