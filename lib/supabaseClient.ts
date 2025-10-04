import { createClient } from '@supabase/supabase-js'


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

//TODO: Will enforce stronger type check
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
    public: {
        Tables: {
            math_problem_sessions: {
                Row: {
                    id: string
                    created_at: string
                    problem_text: string
                    correct_answer: number
                }
                Insert: {
                    id?: string
                    created_at?: string
                    problem_text: string
                    correct_answer: number
                }
                Update: {
                    id?: string
                    created_at?: string
                    problem_text?: string
                    correct_answer?: number
                }
            }
            math_problem_submissions: {
                Row: {
                    id: string
                    session_id: string
                    user_answer: number
                    is_correct: boolean
                    feedback_text: string
                    created_at: string     // matches SQL, auto-filled by Postgres (optional in Insert)
                }
                Insert: {
                    id?: string
                    session_id: string
                    user_answer: number
                    is_correct: boolean
                    feedback_text: string
                    created_at?: string // matches SQL, auto-filled by Postgres (optional in Insert)
                }
                Update: {
                    id?: string
                    session_id?: string
                    user_answer?: number
                    is_correct?: boolean
                    feedback_text?: string
                    created_at?: string // matches SQL, auto-filled by Postgres (optional in Insert)
                }
            }
        }
    }
}