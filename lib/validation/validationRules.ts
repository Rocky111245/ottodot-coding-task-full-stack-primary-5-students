/**
 * VALIDATION RULES - Structure Testing
 *
 * Responsibility: Validate API response structure
 * Currently: Structure only (content validation disabled for now)
 */

export interface ValidationResult {
    isValid: boolean
    errors: string[]
}

/**
 * Validates the structure of Gemini's JSON response
 * Ensures: correct fields, correct types, valid values
 */
export function validateProblemStructure(data: unknown): ValidationResult {
    const errors: string[] = []

    // Check if data exists
    if (!data || typeof data !== 'object') {
        errors.push('Response is not an object')
        return { isValid: false, errors }
    }

    const problem = data as Record<string, unknown>

    // Validate problem_text
    if (!problem.problem_text) {
        errors.push('Missing problem_text field')
    } else if (typeof problem.problem_text !== 'string') {
        errors.push(`problem_text must be string, got ${typeof problem.problem_text}`)
    } else if (problem.problem_text.trim().length === 0) {
        errors.push('problem_text cannot be empty')
    }

    // Validate final_answer
    if (problem.final_answer === undefined || problem.final_answer === null) {
        errors.push('Missing final_answer field')
    } else if (typeof problem.final_answer === 'string') {
        errors.push('final_answer must be number, not string')
    } else if (typeof problem.final_answer !== 'number') {
        errors.push(`final_answer must be number, got ${typeof problem.final_answer}`)
    } else if (isNaN(problem.final_answer)) {
        errors.push('final_answer is NaN')
    } else if (!isFinite(problem.final_answer)) {
        errors.push('final_answer must be finite (not Infinity)')
    }

    return {
        isValid: errors.length === 0,
        errors
    }
}

/**
 * Content validation (DISABLED for now)
 *
 * TODO: Enable after generation is working
 * Will check: forbidden keywords, inappropriate content, etc.
 */
export function validateProblemContent(problemText: string): ValidationResult {
    // For now, just check it exists
    if (!problemText || problemText.trim().length < 10) {
        return {
            isValid: false,
            errors: ['Problem text too short or empty']
        }
    }

    // TODO: Add forbidden keyword checking
    // TODO: Add inappropriate content checking

    return {
        isValid: true,
        errors: []
    }
}
