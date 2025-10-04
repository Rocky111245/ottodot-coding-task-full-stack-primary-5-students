import { PRIMARY_5_SYLLABUS } from './syllabus'

/**
 * USER PROMPTS - TASK-SPECIFIC INSTRUCTIONS
 *
 * Responsibility: Define WHAT to generate (specific requests)
 * Used in: contents parameter
 */

export const GENERATE_PROBLEM_PROMPT = `${PRIMARY_5_SYLLABUS}

Generate ONE Primary 5 math word problem following the syllabus above.
Vary human names, do not use the same names twice.

CONTEXT IDEAS:
- Shopping: NTUC, Popular bookstore
- Transport: MRT, bus travel
- School: recess, canteen, activities
- Local food: chicken rice, prata, bubble tea
- Currency: Singapore dollars and cents

EXAMPLES:

Fractions:
"Siti bought 3/4 kg of sugar from NTUC. She used 2/5 kg to bake cookies. How many kilograms does she have left?"
Answer: 0.35

Percentage:
"A Popular bookstore has 15% off. A storybook costs $24. What is the sale price?"
Answer: 20.40

Volume:
"A fish tank is 40 cm long, 25 cm wide, and 30 cm high. What is its volume in cm³?"
Answer: 30000

Rate:
"Mr Tan drives at 60 km/h. How far will he travel in 2.5 hours?"
Answer: 150

Average:
"5 boys have average mass 42 kg. What is their total mass?"
Answer: 210

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

PROBLEM: ${problemText}
CORRECT ANSWER: ${correctAnswer}
STUDENT ANSWER: ${userAnswer}
RESULT: ${isCorrect ? 'CORRECT' : 'INCORRECT'}

Generate encouraging feedback for this student (2-4 sentences).`
}