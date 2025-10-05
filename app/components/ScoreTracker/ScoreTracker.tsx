// app/components/ScoreTracker/ScoreTracker.tsx
'use client'

interface ScoreTrackerProps {
    correct: number
    total: number
}

export default function ScoreTracker({ correct, total }: ScoreTrackerProps) {
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0

    // Encouraging color scheme based on percentage
    // 🌈 All colors are positive and motivating!
    const getColorScheme = (pct: number) => {
        if (pct >= 90) {
            // Excellent! - Purple (achievement)
            return {
                gradient: 'from-purple-50 to-indigo-50',
                border: 'border-purple-200',
                circle: 'bg-purple-500',
                bar: 'bg-purple-500',
                emoji: '🌟'
            }
        } else if (pct >= 70) {
            // Great job! - Blue (confidence)
            return {
                gradient: 'from-blue-50 to-cyan-50',
                border: 'border-blue-200',
                circle: 'bg-blue-500',
                bar: 'bg-blue-500',
                emoji: '⭐'
            }
        } else if (pct >= 50) {
            // Good progress! - Teal (growth)
            return {
                gradient: 'from-teal-50 to-emerald-50',
                border: 'border-teal-200',
                circle: 'bg-teal-500',
                bar: 'bg-teal-500',
                emoji: '💪'
            }
        } else if (pct >= 30) {
            // Keep going! - Amber (warmth & encouragement)
            return {
                gradient: 'from-amber-50 to-yellow-50',
                border: 'border-amber-200',
                circle: 'bg-amber-500',
                bar: 'bg-amber-500',
                emoji: '🚀'
            }
        } else {
            // You're learning! - Orange (energy & enthusiasm)
            return {
                gradient: 'from-orange-50 to-amber-50',
                border: 'border-orange-200',
                circle: 'bg-orange-500',
                bar: 'bg-orange-500',
                emoji: '🌱'
            }
        }
    }

    const colors = getColorScheme(percentage)

    return (
        <div className={`bg-gradient-to-r ${colors.gradient} rounded-lg p-3 sm:p-4 border ${colors.border}`}>
            <div className="flex items-center justify-between gap-3 sm:gap-4">
                {/* Score Circle - Responsive sizing */}
                <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 ${colors.circle} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white text-sm sm:text-base font-bold leading-none">
                            {percentage}%
                        </span>
                    </div>
                    <div className="min-w-0">
                        <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-1">
                            Your Score <span className="text-base">{colors.emoji}</span>
                        </p>
                        <p className="text-xl sm:text-2xl font-bold text-gray-800 truncate">
                            {correct}/{total}
                        </p>
                    </div>
                </div>

                {/* Accuracy Bars - Hidden on small screens if needed */}
                <div className="text-right flex-shrink-0">
                    <p className="text-xs text-gray-500 mb-1">Accuracy</p>
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className={`w-1.5 sm:w-2 h-6 sm:h-8 rounded-full ${
                                    i < Math.ceil(percentage / 20)
                                        ? colors.bar
                                        : 'bg-gray-200'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}