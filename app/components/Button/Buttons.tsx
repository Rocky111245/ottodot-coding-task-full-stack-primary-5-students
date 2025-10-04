'use client'

import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline';
    isLoading?: boolean;
}

/**
 * Reusable Button component
 * Used across the app for consistency
 */
export default function Button({
                                   children,
                                   variant = 'primary',
                                   isLoading = false,
                                   disabled,
                                   className = '',
                                   ...props
                               }: ButtonProps) {
    const baseStyles = 'px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantStyles = {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white',
        outline: 'border-2 border-blue-600 hover:bg-blue-50 text-blue-600',
    };

    return (
        <button
            disabled={disabled || isLoading}
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
            {...props}
        >
            {isLoading ? (
                <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading...
        </span>
            ) : (
                children
            )}
        </button>
    );
}