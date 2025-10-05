// app/components/Dashboard/PracticeCallToAction.tsx
'use client'

interface PracticeCallToActionProps {
    onStartPractice: () => void
}

export default function PracticeCallToAction({ onStartPractice }: PracticeCallToActionProps) {
    return (
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-xl p-8 text-white">
            <div className="text-center mb-6">
                <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-5xl">🧮</span>
                </div>
                <h2 className="text-2xl font-bold mb-2">
                    Start Practicing
                </h2>
                <p className="text-blue-100">
                    Jump into a practice session and improve your math skills
                </p>
            </div>
            <button
                onClick={onStartPractice}
                className="w-full bg-white text-blue-600 font-bold py-4 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 hover:bg-blue-50 active:scale-100"
            >
                Go to Practice Chat →
            </button>
        </div>
    )
}