// app/chat/_components/ChatHistorySidebar.tsx
'use client'

import { useEffect, useState } from 'react'

interface Session {
    id: string
    created_at: string
}

interface ChatHistorySidebarProps {
    isOpen: boolean
    onClose: () => void
    onSelectSession: (sessionId: string) => void
}

export default function ChatHistorySidebar({
                                               isOpen,
                                               onClose,
                                               onSelectSession
                                           }: ChatHistorySidebarProps) {
    const [sessions, setSessions] = useState<Session[]>([])
    const [isLoading, setIsLoading] = useState(false)

    // Fetch sessions from database when sidebar opens
    useEffect(() => {
        if (isOpen) {
            const fetchSessions = async () => {
                setIsLoading(true)
                try {
                    const response = await fetch('/api/sessions')
                    if (!response.ok) {
                        console.error('Failed to fetch sessions')
                        return
                    }

                    const data = await response.json()
                    if (data.success) {
                        setSessions(data.sessions || [])
                    }
                } catch (err) {
                    console.error('Error fetching sessions:', err)
                } finally {
                    setIsLoading(false)
                }
            }

            fetchSessions()
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <>
            <div
                className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
                onClick={onClose}
            />

            <div className={`fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
                <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <div>
                        <h2 className="font-bold">Chat History</h2>
                        <p className="text-xs opacity-90">{sessions.length} problems solved</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                    >
                        ✕
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    {isLoading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
                            <p className="text-gray-500 text-sm">Loading history...</p>
                        </div>
                    ) : sessions.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                                <span className="text-3xl">📝</span>
                            </div>
                            <p className="text-gray-500 text-sm font-medium">No history yet</p>
                            <p className="text-gray-400 text-xs mt-1">
                                Solve problems to see them here
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {sessions.map((session, index) => (
                                <button
                                    key={session.id}
                                    onClick={() => {
                                        onSelectSession(session.id)
                                        onClose()
                                    }}
                                    className="w-full text-left p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 group hover:shadow-md"
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-medium text-gray-700">
                                            Problem #{sessions.length - index}
                                        </span>
                                        <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                    <p className="text-xs text-gray-400">
                                        {new Date(session.created_at).toLocaleString()}
                                    </p>
                                    <p className="text-xs text-gray-400 font-mono truncate mt-1">
                                        ID: {session.id}
                                    </p>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}