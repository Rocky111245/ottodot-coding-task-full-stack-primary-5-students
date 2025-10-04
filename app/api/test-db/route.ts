import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        // Check if environment variables are set
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
            return NextResponse.json({
                error: 'NEXT_PUBLIC_SUPABASE_URL is not set in .env.local'
            }, { status: 500 })
        }

        if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
            return NextResponse.json({
                error: 'NEXT_PUBLIC_SUPABASE_ANON_KEY is not set in .env.local'
            }, { status: 500 })
        }

        // Create Supabase client
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        )

        // Test 1: Check if we can query the math_problem_sessions table
        const { data: sessions, error: sessionsError } = await supabase
            .from('math_problem_sessions')
            .select('*')
            .limit(5)

        if (sessionsError) {
            return NextResponse.json({
                success: false,
                error: 'Database query failed',
                details: sessionsError.message,
                hint: 'Make sure I ran the database.sql script in Supabase SQL Editor'
            }, { status: 500 })
        }

        // Test 2: Check if we can query the math_problem_submissions table
        const { data: submissions, error: submissionsError } = await supabase
            .from('math_problem_submissions')
            .select('*')
            .limit(5)

        if (submissionsError) {
            return NextResponse.json({
                success: false,
                error: 'Submissions table query failed',
                details: submissionsError.message
            }, { status: 500 })
        }

        // All tests passed!
        return NextResponse.json({
            success: true,
            message: 'Supabase connected successfully! 🎉',
            tables: {
                math_problem_sessions: {
                    exists: true,
                    count: sessions.length,
                    data: sessions
                },
                math_problem_submissions: {
                    exists: true,
                    count: submissions.length,
                    data: submissions
                }
            },
            config: {
                url: process.env.NEXT_PUBLIC_SUPABASE_URL,
                keyPresent: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
            }
        })

    } catch (err: any) {
        return NextResponse.json({
            success: false,
            error: 'Unexpected error',
            details: err.message || String(err)
        }, { status: 500 })
    }
}