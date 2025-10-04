'use client'

import { useState } from 'react'
import ChatBox from '@/app/components/ChatBox/ChatBox'
import ChatMessage from '@/app/components/ChatMessageDisplay/ChatMessage'
import Button from '@/app/components/Button/Buttons'
import { Message, GenerateProblemResponse } from '@/ts-types/chat'


/**
 * ChatScreen - Main chat interface screen
 * Glues together: ChatBox + ChatMessage + Button
 * Handles: Problem generation and display
 */
export default function ChatScreen() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Generate a new math problem
     */
    const handleGenerateProblem = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/generate-problem', {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Failed to generate problem');
            }

            const data: GenerateProblemResponse = await response.json();

            // Create new message and add to list
            const newMessage: Message = {
                id: data.session_id,
                text: data.problem_text,
                timestamp: new Date(),
                sender: 'ai',
            };

            setMessages((prev) => [...prev, newMessage]);
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'An error occurred';
            setError(errorMsg);
            console.error('Error generating problem:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Header content
    const header = (
        <div>
            <h2 className="text-lg font-bold">Math Practice Chat</h2>
            <p className="text-sm opacity-90">Primary 5 Singapore Mathematics</p>
        </div>
    );

    // Footer content
    const footer = (
        <div className="flex flex-col items-center gap-2">
            <Button
                onClick={handleGenerateProblem}
                isLoading={isLoading}
                disabled={isLoading}
                className="w-full max-w-sm"
            >
                {isLoading ? 'Generating...' : '✨ Generate New Problem'}
            </Button>
            {error && (
                <p className="text-red-600 text-sm">⚠️ {error}</p>
            )}
        </div>
    );

    return (
        <ChatBox header={header} footer={footer} maxHeight="70vh">
            {/* Empty State */}
            {messages.length === 0 && !isLoading && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="bg-blue-100 rounded-full p-6 mb-4">
                        <span className="text-5xl">🧮</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Ready to Practice Math?
                    </h3>
                    <p className="text-gray-600 max-w-md">
                        Click the button below to generate your first Primary 5 math problem!
                    </p>
                </div>
            )}

            {/* Messages */}
            <div className="space-y-4">
                {messages.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} />
                ))}

                {isLoading && (
                    <div className="flex items-center gap-3 text-gray-600">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm">🤖</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100" />
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200" />
                            <span className="text-sm ml-2">Your AI Companion is thinking...</span>
                        </div>
                    </div>
                )}
            </div>
        </ChatBox>
    );
}