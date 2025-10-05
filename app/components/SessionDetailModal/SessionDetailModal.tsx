// app/components/ChatHistory/SessionDetailModal.tsx
'use client'

import { useEffect, useState } from 'react'

/**
 * Displays the details of a chat sessions
 * Can differentiate between AI and user submissions via UI styles
 */


interface SessionData {
    id: string
    problem_text: string
    correct_answer: number
    created_at: string
    math_problem_submissions: Array<{
        user_answer: number
        is_correct: boolean
        feedback_text: string
        created_at: string
    }>
}

interface SessionDetailModalProps {
    sessionId: string | null
    onClose: () => void
}

export default function SessionDetailModal({sessionId, onClose}: SessionDetailModalProps) {
    const [session, setSession] = useState<SessionData | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!sessionId) {
            setSession(null)
            setError(null)
            return
        }

        const fetchSession = async () => {
            setIsLoading(true)
            setError(null)
            try {
                const response = await fetch(`/api/session/${sessionId}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch sessions')
                }
                const data = await response.json()
                setSession(data.session)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load sessions')
            } finally {
                setIsLoading(false)
            }
        }

        fetchSession()
    }, [sessionId])

    if (!sessionId) return null

    return (
        <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                {isLoading ? (
                    <div className="p-16 text-center">
                        <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto" />
                        <p className="text-gray-500 mt-6 text-sm">Loading session...</p>
                    </div>
                ) : error ? (
                    <div className="p-16 text-center">
                        <p className="text-red-500 text-sm mb-4">{error}</p>
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm transition-colors"
                        >
                            Close
                        </button>
                    </div>
                ) : session ? (
                    <>
                        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex justify-between items-center rounded-t-2xl z-10">
                            <div>
                                <h3 className="font-bold text-xl">Session Detail</h3>
                                <p className="text-sm opacity-90 mt-1">
                                    {new Date(session.created_at).toLocaleString()}
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors text-2xl"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Session ID</p>
                                <p className="text-sm font-mono text-gray-700 break-all">{session.id}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500 uppercase tracking-wide mb-3 font-semibold">Problem</p>
                                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                                    <p className="text-gray-800 leading-relaxed text-lg">{session.problem_text}</p>
                                </div>
                            </div>

                            {session.math_problem_submissions[0] && (
                                <>
                                    <div>
                                        <p className="text-sm text-gray-500 uppercase tracking-wide mb-3 font-semibold">Your Answer</p>
                                        <div className={`rounded-xl p-6 border-2 ${
                                            session.math_problem_submissions[0].is_correct
                                                ? 'bg-green-50 border-green-200'
                                                : 'bg-red-50 border-red-200'
                                        }`}>
                                            <div className="flex items-center justify-between">
                                                <p className="text-4xl font-bold text-gray-800">
                                                    {session.math_problem_submissions[0].user_answer}
                                                </p>
                                                <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                                                    session.math_problem_submissions[0].is_correct
                                                        ? 'bg-green-200 text-green-800'
                                                        : 'bg-red-200 text-red-800'
                                                }`}>
                                                    {session.math_problem_submissions[0].is_correct ? '✓ CORRECT' : '✗ INCORRECT'}
                                                </span>
                                            </div>
                                            {!session.math_problem_submissions[0].is_correct && (
                                                <p className="text-base text-gray-700 mt-4">
                                                    Correct answer: <strong className="text-xl">{session.correct_answer}</strong>
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {session.math_problem_submissions[0].feedback_text && (
                                        <div>
                                            <p className="text-sm text-gray-500 uppercase tracking-wide mb-3 font-semibold">AI Feedback</p>
                                            <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
                                                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-base">
                                                    {session.math_problem_submissions[0].feedback_text}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    )
}