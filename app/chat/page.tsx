
// app/chat/page.tsx
import ChatScreen from '@/app/chat/_components/ChatScreen'
import type { Metadata } from 'next'

//Just for better SEO
export const metadata: Metadata = {
    title: 'Math Practice Chat | Primary 5',
    description: 'Practice Primary 5 Singapore Mathematics with AI-powered feedback',
}

export default function ChatPage() {
    return <ChatScreen />
}
