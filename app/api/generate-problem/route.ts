// app/api/generate-problem/route.ts
import { NextResponse } from 'next/server'
import { getAI } from '@/app/api/genAI/genAI'
import { supabase } from '@/lib/supabaseClient'
import { MODEL_NAME, PROBLEM_GENERATION_CONFIG } from '@/lib/geminiConfig'
import { GENERATE_PROBLEM_PROMPT } from '@/lib/prompts/userPrompt'

type ProblemPayload = { problem_text: string; final_answer: number }

export async function POST() {
    try {
        const ai = getAI()

        // 1) Ask Gemini for a JSON payload (schema is enforced in PROBLEM_GENERATION_CONFIG)
        const res = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: GENERATE_PROBLEM_PROMPT,
            config: PROBLEM_GENERATION_CONFIG,
        })

        const jsonText =
            typeof (res as any).text === 'function' ? (res as any).text() : (res as any).text

        if (!jsonText || typeof jsonText !== 'string') {
            return NextResponse.json({ success: false, error: 'Empty response from AI' }, { status: 502 })
        }

        let parsed: ProblemPayload
        try {
            parsed = JSON.parse(jsonText) as ProblemPayload
        } catch {
            return NextResponse.json({ success: false, error: 'Invalid JSON from AI' }, { status: 502 })
        }

        // Minimal runtime checks (schema already requested, but trust and verify)
        if (
            !parsed ||
            typeof parsed.problem_text !== 'string' ||
            typeof parsed.final_answer !== 'number'
        ) {
            return NextResponse.json({ success: false, error: 'Malformed AI payload' }, { status: 502 })
        }

        // 2) Save to DB (Do not return the answer to the client yet)
        const { data: session, error } = await supabase
            .from('math_problem_sessions')
            .insert({
                problem_text: parsed.problem_text,
                correct_answer: parsed.final_answer,
            })
            .select('id, problem_text, created_at')
            .single()

        if (error || !session) {
            return NextResponse.json({ success: false, error: 'Failed to save problem' }, { status: 500 })
        }

        // 3) Return exactly what the chat screen needs
        return NextResponse.json(
            {
                success: true,
                session_id: session.id,
                problem_text: session.problem_text,
                created_at: session.created_at,
            },
            { status: 201 }
        )
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err)
        return NextResponse.json({ success: false, error: message }, { status: 500 })
    }
}
