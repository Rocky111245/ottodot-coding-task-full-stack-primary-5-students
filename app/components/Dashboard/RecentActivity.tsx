// app/components/Dashboard/RecentActivity.tsx
'use client'

interface RecentActivityProps {
    totalProblems: number
    onViewHistory: () => void
}

export default function RecentActivity({ totalProblems, onViewHistory }: RecentActivityProps) {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">
                    Recent Activity
                </h3>
                {totalProblems > 0 && (
                    <button
                        onClick={onViewHistory}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                        View All
                    </button>
                )}
            </div>

            {totalProblems === 0 ? (
                <div className="text-center py-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <span className="text-2xl">📚</span>
                    </div>
                    <p className="text-gray-500 text-sm font-medium mb-1">
                        No activity yet
                    </p>
                    <p className="text-gray-400 text-xs">
                        Start practicing to see your progress here
                    </p>
                </div>
            ) : (
                <p className="text-gray-600 text-sm">
                    You've solved {totalProblems} problem{totalProblems !== 1 ? 's' : ''} so far.
                    Keep up the great work!
                </p>
            )}
        </div>
    )
}