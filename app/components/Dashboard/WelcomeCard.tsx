// app/components/Dashboard/WelcomeCard.tsx
'use client'

export default function WelcomeCard() {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-3xl">🎓</span>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-800">
                        Welcome Back!
                    </h2>
                    <p className="text-sm text-gray-500">
                        Ready to practice math?
                    </p>
                </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
                Practice Primary 5 math problems with AI-powered feedback.
                Get step-by-step explanations and track your progress.
            </p>
        </div>
    )
}