// app/api/genAI.ts
// Main init file for all calls which needs the Gemini API (Separation of Concern)

import { GoogleGenAI } from '@google/genai'

let _ai: GoogleGenAI | undefined

//Since all backend calls require this instantiation, we can call from here and construct model there according to the
//use case
export function getAI(): GoogleGenAI {
    if (_ai) return _ai
    const apiKey = process.env.GOOGLE_API_KEY
    if (!apiKey) {
        // Fail fast during boot or on first call if misconfigured
        throw new Error('Missing GOOGLE_API_KEY environment variable')
    }
    _ai = new GoogleGenAI({ apiKey })
    return _ai
}
