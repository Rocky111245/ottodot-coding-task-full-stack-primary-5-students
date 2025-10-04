'use client'

import { useState } from 'react'
import ChatScreen from "@/app/screens/ChatScreen/ChatScreen";


interface MathProblem {
  problem_text: string
  final_answer: number
}

//Removed initial code for now (provided in the starter kit), I will focus on displaying and generating the content properly for now.

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <main className="container mx-auto px-4 py-8 max-w-2xl">

                <button
                    className="mt-8 px-6 py-3 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-bold rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition-transform duration-200"
                >
                    Tailwind Works 🎉
                </button>

                <ChatScreen />
            </main>
        </div>
    )
}