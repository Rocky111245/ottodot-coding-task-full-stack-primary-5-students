// app/api/sessions/route.ts
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

/**
 * GET /api/sessions
 *
 * Returns actual sessions count and IDs from database
 * Replaces localStorage as source of truth
 */

export async function GET() {
    try {
        // Query database for all sessions, ordered by creation time
        const { data, error, count } = await supabase
            .from('math_problem_sessions')
            .select('id, created_at', { count: 'exact' })
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Database query error:', error)
            return NextResponse.json(
                { success: false, error: 'Failed to fetch sessions' },
                { status: 500 }
            )
        }

        // Return both count and sessions IDs for history sidebar
        return NextResponse.json({
            success: true,
            count: count || 0,
            sessions: data || []
        })

    } catch (err) {
        const message = err instanceof Error ? err.message : String(err)
        return NextResponse.json(
            { success: false, error: message },
            { status: 500 }
        )
    }
}