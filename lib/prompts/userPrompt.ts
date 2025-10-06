import { PRIMARY_5_SYLLABUS } from './syllabus'

/**
 * USER PROMPTS - TASK-SPECIFIC INSTRUCTIONS
 *
 * Responsibility: Define WHAT to generate (specific requests)
 * Used in: contents parameter
 */

export const GENERATE_PROBLEM_PROMPT = `

Generate ONE Primary 5 math word problem following the syllabus as given in the system instruction.
Vary human names and problems, do not use the same names twice. Try to use as many different topics as possible.

Generate ONE new problem now.`

/**
 * Generate feedback for a student's answer
 * Template: Replace {placeholders} with actual values
 */
export function generateFeedbackPrompt(
    problemText: string,
    correctAnswer: number,
    userAnswer: number,
    isCorrect: boolean
): string {
    return `${PRIMARY_5_SYLLABUS}

PROBLEM:${problemText}
STUDENT'S ANSWER: ${userAnswer}
CORRECT ANSWER: ${correctAnswer}
RESULT: ${isCorrect ? 'CORRECT' : 'INCORRECT'}

Generate detailed feedback following the structure in your system instructions. Show step-by-step working and explain the mathematical reasoning.
and do not use * or other special characters when mentioning the step-by-step plan. Keep a normal conversation.`
}