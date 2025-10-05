'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ChatBox from '@/app/chat/_components/ChatBox'
import ChatMessage from '@/app/chat/_components/ChatMessage'
import Button from '@/app/components/Button/Buttons'
import ScoreTracker from '@/app/components/ScoreTracker/ScoreTracker'
import { Message, GenerateProblemResponse } from '@/ts-types/chat'

/**
 * Glues together the ChatBox,ChatMessage and reusable components
 * Styles differently based on sender (AI vs user)
 */


interface SubmitAnswerResponse {
    success: boolean
    is_correct: boolean
    correct_answer: number
    submission_id: string
}

interface FeedbackResponse {
    success: boolean
    feedback_text: string
}

export default function ChatScreen() {
    const router = useRouter()
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isFeedbackLoading, setIsFeedbackLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [activeSessionId, setActiveSessionId] = useState<string | null>(null)
    const [userAnswer, setUserAnswer] = useState<string>('')
    const [correctCount, setCorrectCount] = useState(0)
    const [totalAttempts, setTotalAttempts] = useState(0)

    const handleGenerateProblem = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/generate-problem', {
                method: 'POST',
            })

            if (!response.ok) {
                throw new Error('Failed to generate problem')
            }

            const data: GenerateProblemResponse = await response.json()

            const newMessage: Message = {
                id: data.session_id,
                text: data.problem_text,
                timestamp: new Date(),
                sender: 'ai',
            }

            setMessages((prev) => [...prev, newMessage])
            setActiveSessionId(data.session_id)
            setUserAnswer('')

            const existingIds = localStorage.getItem('session_ids')
            const sessionIds = existingIds ? JSON.parse(existingIds) : []
            sessionIds.unshift(data.session_id)
            localStorage.setItem('session_ids', JSON.stringify(sessionIds))

        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'An error occurred'
            setError(errorMsg)
            console.error('Error generating problem:', err)
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmitAnswer = async () => {
        if (!activeSessionId || !userAnswer.trim()) {
            setError('Please enter an answer')
            return
        }

        const numericAnswer = parseFloat(userAnswer)
        if (isNaN(numericAnswer)) {
            setError('Please enter a valid number')
            return
        }

        setIsSubmitting(true)
        setError(null)

        try {
            const response = await fetch('/api/submit-answer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    session_id: activeSessionId,
                    user_answer: numericAnswer,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to submit answer')
            }

            const data: SubmitAnswerResponse = await response.json()

            setTotalAttempts(prev => prev + 1)
            if (data.is_correct) {
                setCorrectCount(prev => prev + 1)
            }

            const userMessage: Message = {
                id: `user-${Date.now()}`,
                text: `My answer: ${numericAnswer}`,
                timestamp: new Date(),
                sender: 'user',
            }

            setMessages((prev) => [...prev, userMessage])
            setActiveSessionId(null)
            setUserAnswer('')

            if (data.is_correct) {
                const correctMessage: Message = {
                    id: `correct-${Date.now()}`,
                    text: 'Correct!',
                    timestamp: new Date(),
                    sender: 'ai',
                }
                setMessages((prev) => [...prev, correctMessage])
            }

            if (data.submission_id) {
                generateFeedback(data.submission_id, data.is_correct, data.correct_answer)
            }
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'An error occurred'
            setError(errorMsg)
            console.error('Error submitting answer:', err)
        } finally {
            setIsSubmitting(false)
        }
    }

    const generateFeedback = async (
        submission_id: string,
        is_correct: boolean,
        correct_answer: number
    ) => {
        setIsFeedbackLoading(true)

        try {
            const response = await fetch('/api/generate-feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ submission_id }),
            })

            if (!response.ok) {
                console.error('Failed to generate feedback')
                const fallbackMessage: Message = {
                    id: `fallback-${Date.now()}`,
                    text: is_correct
                        ? 'Great job! Try the next problem.'
                        : `The correct answer is ${correct_answer}. Try the next one!`,
                    timestamp: new Date(),
                    sender: 'ai',
                }
                setMessages((prev) => [...prev, fallbackMessage])
                return
            }

            const data: FeedbackResponse = await response.json()

            const feedbackMessage: Message = {
                id: `feedback-${Date.now()}`,
                text: data.feedback_text,
                timestamp: new Date(),
                sender: 'ai',
            }

            setMessages((prev) => [...prev, feedbackMessage])
        } catch (err) {
            console.error('Feedback generation error:', err)
        } finally {
            setIsFeedbackLoading(false)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isSubmitting) {
            handleSubmitAnswer()
        }
    }

    const header = (
        <div>
            <h2 className="text-lg font-bold">Math Practice Chat</h2>
            <p className="text-sm opacity-90">Primary 5 Singapore Mathematics</p>
        </div>
    )

    const footer = (
        <div className="flex flex-col gap-3">
            {activeSessionId ? (
                <div className="flex flex-col sm:flex-row gap-2">
                    <input
                        type="number"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter your answer..."
                        disabled={isSubmitting}
                        className="flex-1 px-4 py-3 border-2 text-black rounded-lg focus:outline-none focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        autoFocus
                    />
                    <Button
                        onClick={handleSubmitAnswer}
                        isLoading={isSubmitting}
                        disabled={isSubmitting || !userAnswer.trim()}
                        className="sm:w-auto w-full"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                </div>
            ) : (
                <div className="flex justify-center">
                    <Button
                        onClick={handleGenerateProblem}
                        isLoading={isLoading}
                        disabled={isLoading || isFeedbackLoading}  // ← ADD THIS
                        className="w-full max-w-sm"
                    >
                        {isLoading ? 'Generating...' :
                            isFeedbackLoading ? 'Loading feedback...' :  // ← ADD THIS
                                'Generate New Problem'}
                    </Button>
                </div>
            )}

            {error && (
                <p className="text-red-600 text-sm text-center">{error}</p>
            )}
        </div>
    )

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-8 px-4">
            {/* Back to Home Button */}
            <button
                onClick={() => router.push('/')}
                className="fixed top-4 left-4 z-30 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg shadow-lg hover:border-blue-500 hover:shadow-xl transition-all flex items-center gap-2"
            >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="font-medium text-gray-700">Home</span>
            </button>

            {/* Main Content Container */}
            <div className="max-w-4xl mx-auto space-y-4">
                {totalAttempts > 0 && (
                    <ScoreTracker correct={correctCount} total={totalAttempts} />
                )}

                <ChatBox header={header} footer={footer} maxHeight="calc(100vh - 200px)">
                    {messages.length === 0 && !isLoading && (
                        <div className="flex flex-col items-center justify-center h-full text-center px-4">
                            <div className="bg-blue-100 rounded-full p-6 mb-4">
                                <span className="text-5xl">🧮</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                Ready to Practice Math?
                            </h3>
                            <p className="text-gray-600 max-w-md">
                                Click the button below to generate your first Primary 5 math problem!
                            </p>
                        </div>
                    )}

                    <div className="space-y-4">
                        {messages.map((msg) => (
                            <ChatMessage key={msg.id} message={msg} />
                        ))}

                        {isLoading && (
                            <div className="flex items-center gap-3 text-gray-600">
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm">🤖</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100" />
                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200" />
                                    <span className="text-sm ml-2">Generating problem...</span>
                                </div>
                            </div>
                        )}

                        {isFeedbackLoading && (
                            <div className="flex items-center gap-3 text-gray-600">
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm">🤖</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100" />
                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200" />
                                    <span className="text-sm ml-2">Generating feedback...</span>
                                </div>
                            </div>
                        )}
                    </div>
                </ChatBox>
            </div>
        </div>
    )
}