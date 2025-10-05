// app/components/HomePage/HomePage.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
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


interface GlobalStats {
    total_attempts: number
    correct_attempts: number
    accuracy_percentage: number
}

export default function HomePage() {
    const router = useRouter()
    const [totalProblems, setTotalProblems] = useState(0)
    const [globalStats, setGlobalStats] = useState<GlobalStats>({
        total_attempts: 0,
        correct_attempts: 0,
        accuracy_percentage: 0
    })
    const [isHistoryOpen, setIsHistoryOpen] = useState(false)
    const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null)

    // Fetch session count and global stats on mount
    const pathname = usePathname()

    // Fetch data on mount AND when pathname changes (user navigates back)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const timestamp = Date.now()
                const sessionsResponse = await fetch(`/api/sessions?_=${timestamp}`, {
                    cache: 'no-store'  // Prevent caching
                })
                if (sessionsResponse.ok) {
                    const sessionsData = await sessionsResponse.json()
                    if (sessionsData.success) {
                        setTotalProblems(sessionsData.count)
                    }
                }

                // Fetch global statistics
                const statsResponse = await fetch(`/api/stats?_=${timestamp}`, {
                    cache: 'no-store'  // Prevent caching
                })
                if (statsResponse.ok) {
                    const statsData = await statsResponse.json()
                    if (statsData.success) {
                        setGlobalStats(statsData.stats)
                    }
                }
            } catch (err) {
                console.error('Error fetching data:', err)
            }
        }

        fetchData()
    }, [pathname])  // Re-fetch when pathname changes (user navigates here)

    const handleStartPractice = () => {
        router.push('/chat')
    }

    const handleViewHistory = () => {
        setIsHistoryOpen(prev => !prev)
    }

    const handleCloseSidebar = async () => {
        setIsHistoryOpen(false)

        // Refetch count when sidebar closes
        const timestamp = Date.now()
        const response = await fetch(`/api/sessions?_=${timestamp}`, { cache: 'no-store' })
        const data = await response.json()
        if (data.success) {
            setTotalProblems(data.count)
        }
    }
    return (
        <>
            <ChatHistorySidebar
                isOpen={isHistoryOpen}
                onClose={handleCloseSidebar}
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
                                className="fixed top-2 right-2 sm:top-4 sm:right-4 z-50 px-2 py-1.5 sm:px-4 sm:py-2 bg-white border-2 border-gray-300 rounded-lg shadow-lg hover:border-blue-500 hover:shadow-xl transition-all flex items-center gap-1 sm:gap-2 text-sm"
                            >
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="hidden xs:inline sm:inline font-medium text-gray-700">History</span>
                                <span className="bg-blue-500 text-white text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
                        {totalProblems}
                                </span>
                            </button>
                        )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        <div className="space-y-6">
                            <WelcomeCard />
                            <ProgressStats
                                totalProblems={totalProblems}
                                globalStats={globalStats}
                            />
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