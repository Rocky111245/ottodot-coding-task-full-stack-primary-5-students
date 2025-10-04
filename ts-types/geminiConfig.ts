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

// Math problem structure (matches DB schema)
export interface MathProblem {
    problem_text: string
    final_answer: number
}

// Token limits for monitoring
export const TOKEN_LIMITS = {
    MAX_PROMPT_TOKENS: 2000,
    MAX_PROBLEM_OUTPUT_TOKENS: 500,
    ESTIMATED_TOKENS_PER_PROBLEM: 350,
} as const