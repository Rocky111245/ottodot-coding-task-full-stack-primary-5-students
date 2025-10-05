import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

/**
 * GET /api/session/[id]
 *
 * Purpose:
 * Retrieve the details of a single math problem session by its ID.
 * - Fetches the problem text, correct answer, and creation time.
 * - Also fetches all related user submissions for that session (answers, correctness, feedback).
 *
 * Responsibilities:
 * - Query the 'math_problem_sessions' table in Supabase using the session ID.
 * - Return the session data as JSON if found.
 * - Return appropriate error responses if the session is not found or a server error occurs.
 *
 * Note:
 * This route does not generate a new problem or handle answer submissions.
 * Those are handled by other routes (/api/generate-problem and /api/submit-answer).
 */

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { data, error } = await supabase
            .from('math_problem_sessions')
            .select(`
                id,
                problem_text,
                correct_answer,
                created_at,
                math_problem_submissions (
                    user_answer,
                    is_correct,
                    feedback_text,
                    created_at
                )
            `)
            .eq('id', params.id)
            .single()

        if (error || !data) {
            return NextResponse.json(
                { error: 'Session not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({ session: data })

    } catch (err) {
        const message = err instanceof Error ? err.message : String(err)
        return NextResponse.json(
            { error: message },
            { status: 500 }
        )
    }
}