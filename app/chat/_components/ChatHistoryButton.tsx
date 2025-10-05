'use client'

interface ChatHistoryButtonProps {
    onClick: () => void
    count: number
}

export default function ChatHistoryButton({ onClick, count }: ChatHistoryButtonProps) {
    return (
        <button
            onClick={onClick}
            className="fixed top-4 right-4 z-30 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg shadow-lg hover:border-blue-500 hover:shadow-xl transition-all flex items-center gap-2"
        >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium text-gray-700">History</span>
            {count > 0 && (
                <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {count}
                </span>
            )}
        </button>
    )
}