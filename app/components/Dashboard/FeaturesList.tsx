// app/components/Dashboard/FeaturesList.tsx
'use client'

interface Feature {
    title: string
    description: string
}

const features: Feature[] = [
    {
        title: 'AI-Generated Problems',
        description: 'Unlimited unique problems from Singapore syllabus'
    },
    {
        title: 'Step-by-Step Feedback',
        description: 'Detailed explanations for every answer'
    },
    {
        title: 'Progress Tracking',
        description: 'Review past problems and track accuracy'
    }
]

export default function FeaturesList() {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
                Features
            </h3>
            <div className="space-y-3">
                {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-green-600">✓</span>
                        </div>
                        <div>
                            <p className="font-medium text-gray-800">{feature.title}</p>
                            <p className="text-sm text-gray-500">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}