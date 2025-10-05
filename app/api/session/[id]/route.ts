// app/api/session/[id]/route.ts
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

/**
 * GET /api/session/[id]
 *
 * Fetches a single session with all details including submissions and feedback
 * Used by SessionDetailModal
 */
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        // app/api/session/[id]/route.ts
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
                      created_at)`)
            .eq('id', params.id)
            .order('created_at', { referencedTable: 'math_problem_submissions', ascending: false })
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