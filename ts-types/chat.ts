/**
 * Minimal types for Phase 1: Just displaying problems
 */

// Simple message structure
export interface Message {
    id: string;
    text: string;
    timestamp: Date;
    sender: 'ai' | 'user';
}

// API response when generating a problem
export interface GenerateProblemResponse {
    success: true
    session_id: string
    problem_text: string
    created_at: string
}
