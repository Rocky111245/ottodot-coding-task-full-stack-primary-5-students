// lib/geminiConfig.ts
import { Type } from '@google/genai'
import type { GenConfig } from '@/ts-types/geminiConfig'
import {FEEDBACK_TEACHER_SYSTEM_INSTRUCTION, MATH_TEACHER_SYSTEM_INSTRUCTION} from './prompts/systemPrompt'

/**
 * GEMINI CONFIGURATION
 *
 * Responsibility: Define generation configs and model settings
 * Does NOT contain prompts (those are in lib/prompts/)
 */

export const MODEL_NAME =
    process.env.NEXT_PUBLIC_GEMINI_MODEL?.trim() || 'gemini-2.5-flash'

// Problem generation config with schema (follows test-ai pattern)
export const PROBLEM_GENERATION_CONFIG: GenConfig = {
    systemInstruction: MATH_TEACHER_SYSTEM_INSTRUCTION, // This is from the gemini api documentation.
    temperature: 0.7,
    responseMimeType: 'application/json',  // ← ONLY JSON, no text
    responseSchema: {
        type: Type.OBJECT,
        properties: {
            problem_text: {
                type: Type.STRING,
                description: 'Complete math word problem ending with ?'
            },
            final_answer: {
                type: Type.NUMBER,
                description: 'Numerical answer (no units)'
            }
        },
        required: ['problem_text', 'final_answer'],
        propertyOrdering: ['problem_text', 'final_answer']
    },
    thinkingConfig: {
        thinkingBudget: -1  // Model automatically decides how much to think! This is from the gemini api documentation.
    }
} satisfies GenConfig


// FEEDBACK CONFIG - Natural text
export const FEEDBACK_GENERATION_CONFIG: GenConfig = {
    systemInstruction: FEEDBACK_TEACHER_SYSTEM_INSTRUCTION, // This is from the gemini api documentation.
    temperature: 0.1, // Need a lower temperature for predictability
    responseMimeType: 'text/plain',  // ← Plain text
    topK: 32,
    topP: 0.95,
    thinkingConfig: {
        thinkingBudget: -1  // Model automatically decides how much to think! This is from the gemini api documentation.
    }
    // NO responseSchema needed since it ONLY returns a text.
}