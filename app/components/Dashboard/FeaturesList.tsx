// app/components/Dashboard/FeaturesList.tsx
'use client'

interface Feature {
    title: string
    description: string
}

const features: Feature[] = [
    {
        title: 'AI-Powered Problem Generation',
        description: 'Gemini API generates unlimited Primary 5 problems from Singapore MOE syllabus'
    },
    {
        title: 'Real-Time Score Tracking',
        description: 'Session-based and global accuracy tracking with visual progress indicators'
    },
    {
        title: 'Personalized AI Feedback',
        description: 'Step-by-step explanations with error analysis and learning tips'
    },
    {
        title: 'Multi-Page Architecture',
        description: 'Fast, responsive UI with dashboard and dedicated practice pages'
    },
    {
        title: 'Complete Session History',
        description: 'Review all past problems, answers, and feedback with detailed modals'
    },
    {
        title: 'Encouragement System',
        description: 'Dynamic color-coded feedback and motivational messages based on performance'
    },
    {
        title: 'Database Persistence',
        description: 'Supabase integration ensures all progress is saved and retrievable'
    },
    {
        title: 'Mobile-First Design',
        description: 'Fully responsive Tailwind CSS layout optimized for all screen sizes'
    }
]

export default function FeaturesList() {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
                Platform Features
            </h3>
            <div className="space-y-3">
                {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-sm font-bold">{index + 1}</span>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-800">{feature.title}</p>
                            <p className="text-sm text-gray-600">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}