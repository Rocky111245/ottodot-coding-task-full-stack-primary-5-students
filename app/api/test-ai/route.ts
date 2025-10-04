// app/api/test-ai/route.ts
import { NextResponse } from 'next/server'
import { getAI } from '@/app/api/genAI/genAI'
import { Type } from '@google/genai'

export async function GET() {
    try {
        const ai = getAI()
        const model = process.env.GOOGLE_GENAI_MODEL ?? 'gemini-2.5-flash'

        // ============================================
        // EXAMPLE 1: Unstructured Text (Original)
        // ============================================
        console.log('\n=== EXAMPLE 1: Unstructured Text ===')

        const textResponse = await ai.models.generateContent({
            model,
            contents: 'What model are you? Explain very shortly.',
            config: {
                temperature: 0.1,
                responseMimeType: 'text/plain',
                thinkingConfig: {
                    thinkingBudget: 0,
                },
            },
        })

        console.log('Text Response:', textResponse.text)

        // ============================================
        // EXAMPLE 2: Structured JSON - Math Problem
        // (Assessment requirement testing)
        // ============================================
        console.log('\n=== EXAMPLE 2: Structured JSON - Math Problem ===')

        const jsonResponse = await ai.models.generateContent({
            model,
            contents: `Generate a Primary 5 Singapore math word problem about fractions. 
                       The problem should be suitable for 10-11 year old students.
                       Include the problem text and the correct numerical answer.`,
            config: {
                temperature: 0.9,
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        problem_text: {
                            type: Type.STRING,
                            description: 'The complete math word problem as a question'
                        },
                        final_answer: {
                            type: Type.NUMBER,
                            description: 'The correct numerical answer (just the number, no units)'
                        }
                    },
                    required: ['problem_text', 'final_answer'],
                    propertyOrdering: ['problem_text', 'final_answer']
                },
                thinkingConfig: {
                    thinkingBudget: 0, // Faster generation
                },
            },
        })

        console.log('JSON Response (raw):', jsonResponse.text)

        // Parse the JSON response
        const mathProblem = JSON.parse(jsonResponse.text)
        console.log('Parsed problem_text:', mathProblem.problem_text)
        console.log('Parsed final_answer:', mathProblem.final_answer)

        // ============================================
        // EXAMPLE 3: Structured JSON - Feedback
        // (For the second AI task in assessment)
        // ============================================
        console.log('\n=== EXAMPLE 3: Structured JSON - Feedback ===')

        const feedbackResponse = await ai.models.generateContent({
            model,
            contents: `A student answered 0.5 to the problem "What is 1/4 + 1/4?". 
                       The correct answer is 0.5.
                       Provide encouraging feedback for this CORRECT answer.`,
            config: {
                temperature: 0.7,
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        is_correct: {
                            type: Type.BOOLEAN,
                            description: 'Whether the student answer is correct'
                        },
                        feedback_text: {
                            type: Type.STRING,
                            description: 'Encouraging feedback for the student (2-3 sentences)'
                        }
                    },
                    required: ['is_correct', 'feedback_text']
                },
                thinkingConfig: {
                    thinkingBudget: 0,
                },
            },
        })

        const feedback = JSON.parse(feedbackResponse.text)
        console.log('Feedback:', feedback)

        // ============================================
        // Return All Results
        // ============================================
        return NextResponse.json({
            success: true,
            examples: {
                example1_unstructured: {
                    type: 'text/plain',
                    response: textResponse.text
                },
                example2_math_problem: {
                    type: 'application/json',
                    raw: jsonResponse.text,
                    parsed: mathProblem,
                    schema: 'problem_text + final_answer'
                },
                example3_feedback: {
                    type: 'application/json',
                    raw: feedbackResponse.text,
                    parsed: feedback,
                    schema: 'is_correct + feedback_text'
                }
            }
        })

    } catch (err) {
        console.error('Error details:', err)
        const message = err instanceof Error ? err.message : String(err)
        return NextResponse.json({
            ok: false,
            error: message,
            stack: err instanceof Error ? err.stack : undefined
        }, { status: 500 })
    }
}

//Comprehensive testing has been done here in this file to play out with the API before the implementation.