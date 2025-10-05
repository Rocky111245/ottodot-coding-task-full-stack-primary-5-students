'use client'

import { Message } from '@/ts-types/chat'

interface ChatMessageProps {
    message: Message;
}

/**
 * Displays a single chat message
 * Styles differently based on sender (AI vs user)
 */

export default function ChatMessage({ message }: ChatMessageProps) {
    const isAI = message.sender === 'ai';

    return (
        <div className={`flex gap-3 ${!isAI ? 'justify-end' : ''} animate-fade-in`}>
            {/* AI Avatar (left side) */}
            {isAI && (
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">🤖</span>
                </div>
            )}

            {/* Message Bubble */}
            <div
                className={`max-w-md rounded-2xl p-4 ${
                    isAI
                        ? 'bg-blue-50 border border-blue-200 rounded-tl-none'
                        : 'bg-purple-500 text-white rounded-tr-none'
                }`}
            >
                {isAI && (
                    <div className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-2">
                        Math Problem
                    </div>
                )}
                {/* Conditional text color based on sender */}
                <p className={`text-sm leading-relaxed whitespace-pre-wrap ${
                    isAI ? 'text-gray-800' : 'text-white'
                }`}>
                    {message.text}
                </p>
                <div className={`text-xs mt-2 ${isAI ? 'text-gray-500' : 'text-white/70'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>

            {/* User Avatar (right side) */}
            {!isAI && (
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">👨‍🎓</span>
                </div>
            )}
        </div>
    );
}