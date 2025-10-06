// app/api/submit-answer/route.ts
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

/**
 * Submit Answer API Route
 * Responsibility: Accept user answer, validate against correct answer, save submission
 * Does NOT generate feedback (that's handled separately in /generate-feedback)
 */

// Request body type
type SubmitAnswerRequest = {
    session_id: string
    user_answer: number
}

// Response type
type SubmitAnswerResponse = {
    success: boolean
    submission_id?: string
    is_correct?: boolean
    correct_answer?: number  // Return for immediate feedback to user
    error?: string
}

export async function POST(request: Request) {
    try {
        // 1) Parse and validate request body
        const body: SubmitAnswerRequest = await request.json()
        const { session_id, user_answer } = body

        // Validate input
        if (!session_id || typeof session_id !== 'string') {
            return NextResponse.json(
                { success: false, error: 'Missing or invalid session_id' },
                { status: 400 }
            )
        }

        if (user_answer === undefined || typeof user_answer !== 'number') {
            return NextResponse.json(
                { success: false, error: 'Missing or invalid user_answer' },
                { status: 400 }
            )
        }

        // 2) Retrieve session from database to get correct_answer
        const { data: session, error: sessionError } = await supabase
            .from('math_problem_sessions')
            .select('id, correct_answer')
            .eq('id', session_id)
            .single()

        if (sessionError || !session) {
            return NextResponse.json(
                { success: false, error: 'Session not found' },
                { status: 404 }
            )
        }

        // 3) Calculate correctness. A very interesting,simple but effective way to assess correctness.
        // Use small epsilon for floating point comparison
        const epsilon = 0.01 ;
        const is_correct = Math.abs(user_answer - session.correct_answer) <= epsilon

        // 4) Save submission to database (no feedback_text for now)
        const { data: submission, error: submissionError } = await supabase
            .from('math_problem_submissions')
            .insert({
                session_id,
                user_answer,
                is_correct,
                feedback_text: ''  // Empty for now, will be updated by feedback route
            })
            .select('id, is_correct')
            .single()

        if (submissionError || !submission) {
            return NextResponse.json(
                { success: false, error: 'Failed to save submission' },
                { status: 500 }
            )
        }

        // 5) Return result
        return NextResponse.json(
            {
                success: true,
                submission_id: submission.id,
                is_correct: submission.is_correct,
                correct_answer: session.correct_answer  // Return so frontend can show it
            },
            { status: 201 }
        )

    } catch (err) {
        const message = err instanceof Error ? err.message : String(err)
        return NextResponse.json(
            { success: false, error: message },
            { status: 500 }
        )
    }
}