import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'success' | 'danger'
}

export default function Button({ variant = 'primary', className = '', disabled, ...props }: ButtonProps) {
    const base = 'px-8 py-3 rounded-2xl font-semibold text-lg focus:outline-none focus:ring-4 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl transform hover:-translate-y-1'

    const variants = {
        primary: 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-purple-600 hover:to-indigo-500 focus:ring-indigo-500/30 border-2 border-indigo-500/20',
        secondary: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-orange-500 hover:to-amber-500 focus:ring-amber-500/30 border-2 border-amber-500/20',
        success: 'bg-gradient-to-r from-green-500 to-emerald-400 text-white hover:from-emerald-400 hover:to-green-500 focus:ring-green-500/30 border-2 border-green-500/20',
        danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-500 focus:ring-red-500/30 border-2 border-red-500/20',
    }
    if (disabled) {
        return (
            <button
                className={`${base} ${variants[variant]} ${className} opacity-50 cursor-not-allowed`}
                disabled
                {...props}
            />
        )
    }

    return (
        <button
            className={`${base} ${variants[variant]} ${className}`}
            disabled={disabled}
            {...props}
        />
    )
}
