// ts-types/gemini.ts

/**
 * Gemini-related types and schemas
 */

// Shared generation config type
export type GenConfig = {
    systemInstruction?:string
    temperature?: number
    topP?: number
    topK?: number
    maxOutputTokens?: number
    responseMimeType?: 'application/json' | 'text/plain'
    responseSchema?: unknown
    thinkingConfig?: {
        thinkingBudget?: number
    }
}
