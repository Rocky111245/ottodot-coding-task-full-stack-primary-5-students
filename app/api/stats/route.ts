// app/api/stats/route.ts
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
export const dynamic = 'force-dynamic'
export const revalidate = 0

/**
 * GET /api/stats
 *
 * Returns global statistics across all sessions
 * - Total problems attempted
 * - Total correct answers
 * - Global accuracy percentage
 */
export async function GET() {
    try {
        // Get all submissions to calculate accuracy
        const { data: submissions, error } = await supabase
            .from('math_problem_submissions')
            .select('is_correct')

        if (error) {
            console.error('Failed to fetch submissions:', error)
            return NextResponse.json(
                { success: false, error: 'Failed to fetch statistics' },
                { status: 500 }
            )
        }

        // Calculate statistics
        const totalAttempts = submissions?.length || 0
        const correctAttempts = submissions?.filter(s => s.is_correct).length || 0
        const accuracy = totalAttempts > 0
            ? Math.round((correctAttempts / totalAttempts) * 100)
            : 0

        return NextResponse.json({
            success: true,
            stats: {
                total_attempts: totalAttempts,
                correct_attempts: correctAttempts,
                accuracy_percentage: accuracy
            }
        })

    } catch (err) {
        const message = err instanceof Error ? err.message : String(err)
        return NextResponse.json(
            { success: false, error: message },
            { status: 500 }
        )
    }
}