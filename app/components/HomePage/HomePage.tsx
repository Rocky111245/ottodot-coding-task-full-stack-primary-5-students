
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ChatHistorySidebar from '@/app/chat/_components/ChatHistorySidebar'
import SessionDetailModal from '@/app/components/SessionDetailModal/SessionDetailModal'
import WelcomeCard from '@/app/components/Dashboard/WelcomeCard'
import ProgressStats from '@/app/components/Dashboard/ProgressStats'
import FeaturesList from '@/app/components/Dashboard/FeaturesList'
import PracticeCallToAction from '@/app/components/Dashboard/PracticeCallToAction'
import RecentActivity from '@/app/components/Dashboard/RecentActivity'
import StudyTip from '@/app/components/Dashboard/StudyTip'


/**
 * Glues together all the dashboard components and handles routing to different pages (e.g. chat). Kept as client so that
 * pages can be rendered on the server and SEO can be applied
 */

export default function HomePage() {
    const router = useRouter()
    const [totalProblems, setTotalProblems] = useState(0)
    const [isHistoryOpen, setIsHistoryOpen] = useState(false)
    const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null)

    useEffect(() => {
        const sessionIds = localStorage.getItem('session_ids')
        if (sessionIds) {
            const ids = JSON.parse(sessionIds)
            setTotalProblems(ids.length)
        }
    }, [])

    const handleStartPractice = () => {
        router.push('/chat')
    }

    const handleViewHistory = () => {
        setIsHistoryOpen(true)
    }

    return (
        <>
            <ChatHistorySidebar
                isOpen={isHistoryOpen}
                onClose={() => setIsHistoryOpen(false)}
                onSelectSession={setSelectedSessionId}
            />
            <SessionDetailModal
                sessionId={selectedSessionId}
                onClose={() => setSelectedSessionId(null)}
            />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                <div className="container mx-auto px-4 py-12">
                    <div className="text-center mb-12 relative">
                        <h1 className="text-4xl font-bold text-gray-800 mb-3">
                            Math Practice Platform
                        </h1>
                        <p className="text-gray-600">
                            Primary 5 Singapore Mathematics
                        </p>

                        {totalProblems > 0 && (
                            <button
                                onClick={handleViewHistory}
                                className="absolute top-0 right-4 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg shadow-lg hover:border-blue-500 transition-all flex items-center gap-2"
                            >
                                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="font-medium text-gray-700">History</span>
                                <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                    {totalProblems}
                                </span>
                            </button>
                        )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        <div className="space-y-6">
                            <WelcomeCard />
                            <ProgressStats totalProblems={totalProblems} />
                            <FeaturesList />
                        </div>

                        <div className="space-y-6">
                            <PracticeCallToAction onStartPractice={handleStartPractice} />
                            <RecentActivity
                                totalProblems={totalProblems}
                                onViewHistory={handleViewHistory}
                            />
                            <StudyTip />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}