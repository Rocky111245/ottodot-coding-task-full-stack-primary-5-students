import HomePage from '@/app/components/HomePage/HomePage'
import type { Metadata } from 'next'

//For better SEO
export const metadata: Metadata = {
    title: 'Math Practice Platform | Primary 5 Singapore Mathematics',
    description: 'Interactive AI-powered math practice for Primary 5 students with real-time feedback',
}

export default function Page() {
    return <HomePage />
}
