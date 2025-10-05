'use client'

import { ReactNode } from 'react'

interface ChatBoxProps {
    children: ReactNode;
    header?: ReactNode;
    footer?: ReactNode;
    maxHeight?: string;
}

/**
 * ChatBox - Container component for the chat interface
 * Provides consistent layout: header, messages area, footer
 * This is just the structure/layout, no logic
 */
export default function ChatBox({
                                    children,
                                    header,
                                    footer,
                                    maxHeight = '600px',
                                }: ChatBoxProps) {
    return (
        <div
            className="flex flex-col bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden"
            style={{ height: maxHeight }}
        >
            {/* Header Section */}
            {header && (
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4">
                    {header}
                </div>
            )}

            {/* Messages Area (scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-white">
                {children}
            </div>

            {/* Footer Section */}
            {footer && (
                <div className="bg-white border-t border-gray-200 p-4">
                    {footer}
                </div>
            )}
        </div>
    );
}