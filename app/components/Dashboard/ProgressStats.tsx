// app/components/Dashboard/ProgressStats.tsx
'use client'

interface ProgressStatsProps {
    totalProblems: number
}

export default function ProgressStats({ totalProblems }: ProgressStatsProps) {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
                Your Progress
            </h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <p className="text-3xl font-bold text-blue-600">
                        {totalProblems}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                        Problems Solved
                    </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                    <p className="text-3xl font-bold text-purple-600">
                        {totalProblems > 0 ? '🔥' : '💤'}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                        {totalProblems > 0 ? 'Keep Going!' : 'Start Now'}
                    </p>
                </div>
            </div>
        </div>
    )
}