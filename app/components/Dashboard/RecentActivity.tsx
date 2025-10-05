// app/components/Dashboard/RecentActivity.tsx
'use client'

interface RecentActivityProps {
    totalProblems: number
    onViewHistory: () => void
}

export default function RecentActivity({ totalProblems, onViewHistory }: RecentActivityProps) {
    if (totalProblems === 0) return null

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">
                    Recent Activity
                </h3>
                <button
                    onClick={onViewHistory}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                    View All
                </button>
            </div>
            <p className="text-gray-600 text-sm">
                You've solved {totalProblems} problem{totalProblems !== 1 ? 's' : ''} so far.
                Keep up the great work!
            </p>
        </div>
    )
}