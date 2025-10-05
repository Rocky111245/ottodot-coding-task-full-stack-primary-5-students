// app/components/Dashboard/StudyTip.tsx
'use client'

export default function StudyTip() {
    return (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                    <h4 className="font-bold text-gray-800 mb-2">
                        Study Tip
                    </h4>
                    <p className="text-sm text-gray-600">
                        Practice regularly for 15-20 minutes daily.
                        Quality matters more than quantity!
                    </p>
                </div>
            </div>
        </div>
    )
}