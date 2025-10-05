import { NextResponse } from 'next/server'
import { getAI } from '@/app/api/genAI/genAI'
import { supabase } from '@/lib/supabaseClient'
import { MODEL_NAME, FEEDBACK_GENERATION_CONFIG } from '@/lib/geminiConfig'
import { generateFeedbackPrompt } from '@/lib/prompts/userPrompt'

/**
 * Only generates feedback
 *
 * Responsibility: Only generate feedback to the user
 * Does NOT handle user submission or problem generation (that has been handled already in the submit-answer route and
 * generate-problem route. This is the last step of the problem-solving process)
 */

type SubmissionWithSession = {
    id: string
    user_answer: number
    is_correct: boolean
    math_problem_sessions: {
        problem_text: string
        correct_answer: number
    }
}

export async function POST(request: Request) {
    try {
        const { submission_id } = await request.json()

        if (!submission_id) {
            return NextResponse.json(
                { success: false, error: 'Missing submission_id' },
                { status: 400 }
            )
        }

        // 1. Fetch submission + sessions data
        const { data, error } = await supabase
            .from('math_problem_submissions')
            .select(`
                id,
                user_answer,
                is_correct,
                math_problem_sessions (
                    problem_text,
                    correct_answer
                )
            `)
            .eq('id', submission_id)
            .single()

        if (error || !data) {
            return NextResponse.json(
                { success: false, error: 'Submission not found' },
                { status: 404 }
            )
        }

        // Type assertion with proper structure
        const submission = data as unknown as SubmissionWithSession

        // 2. Generate feedback prompt. We get it from the userPrompt.ts file in lib/prompts/userPrompt.ts
        const prompt = generateFeedbackPrompt(
            submission.math_problem_sessions.problem_text,
            submission.math_problem_sessions.correct_answer,
            submission.user_answer,
            submission.is_correct
        )

        // 3. Call Gemini API
        const ai = getAI()
        const res = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: prompt,
            config: FEEDBACK_GENERATION_CONFIG,
        })

        // Extract text (no JSON parsing needed - it's plain text since we only return one response unit (a single string))
        const feedback_text = typeof res.text === 'function' ? res.text : res.text

        if (!feedback_text || typeof feedback_text !== 'string') {
            return NextResponse.json(
                { success: false, error: 'Empty feedback from AI' },
                { status: 502 }
            )
        }

        // 4. Update submission with feedback
        const { error: updateError } = await supabase
            .from('math_problem_submissions')
            .update({ feedback_text })
            .eq('id', submission_id)

        if (updateError) {
            return NextResponse.json(
                { success: false, error: 'Failed to save feedback' },
                { status: 500 }
            )
        }

        // 5. Return feedback
        return NextResponse.json({
            success: true,
            feedback_text
        })

    } catch (err) {
        const message = err instanceof Error ? err.message : String(err)
        return NextResponse.json(
            { success: false, error: message },
            { status: 500 }
        )
    }
}