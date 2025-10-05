// app/components/Dashboard/ProgressStats.tsx
'use client'

interface GlobalStats {
    total_attempts: number
    correct_attempts: number
    accuracy_percentage: number
}

interface ProgressStatsProps {
    totalProblems: number
    globalStats: GlobalStats
}

export default function ProgressStats({ totalProblems, globalStats }: ProgressStatsProps) {
    const { total_attempts, correct_attempts, accuracy_percentage } = globalStats

    // Determine encouragement message based on accuracy
    const getEncouragementMessage = (accuracy: number, attempts: number) => {
        if (attempts === 0) return "Start practicing to track your progress!"
        if (accuracy >= 90) return "Outstanding work! You're a math star!"
        if (accuracy >= 70) return "Great job! Keep up the momentum!"
        if (accuracy >= 50) return "Good progress! You're improving!"
        return "Keep practicing! Every problem makes you better!"
    }

    const encouragement = getEncouragementMessage(accuracy_percentage, total_attempts)

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
                Your Progress
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <p className="text-3xl font-bold text-blue-600">
                        {totalProblems}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                        Problems Generated
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

            {/* Global Accuracy Section */}
            {total_attempts > 0 && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-semibold text-gray-700">
                            Overall Accuracy
                        </p>
                        <p className="text-2xl font-bold text-green-600">
                            {accuracy_percentage}%
                        </p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                        <span>{correct_attempts} correct</span>
                        <span>{total_attempts} total answered</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div
                            className="bg-green-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${accuracy_percentage}%` }}
                        />
                    </div>
                    <p className="text-xs text-gray-600 text-center italic">
                        {encouragement}
                    </p>
                </div>
            )}
        </div>
    )
}