import React from 'react'

type Suit = '♠' | '♥' | '♦' | '♣'
interface CardProps {
    rank: string
    suit: Suit
    isDealt?: boolean
    isHidden?: boolean
}

export default function Card({ rank, suit, isDealt = false, isHidden = false }: CardProps) {
    const isRed = suit === '♥' || suit === '♦'

    if (isHidden) {
        return (
            <div className="w-[96px] h-[144px] bg-gradient-to-br from-blue-900 to-blue-700 border-2 rounded-xl border-blue-600 shadow-lg flex items-center justify-center">
                <div className="text-blue-300 text-4xl font-bold">?</div>
            </div>
        )
    }

    return (
        <div
            className={`
                w-[96px] h-[144px] bg-gradient-to-br from-white to-gray-50 
                border-2 rounded-xl border-gray-300 shadow-lg 
                flex flex-col justify-between p-4
                hover:shadow-xl transition-all duration-200 hover:-translate-y-1
                ${isDealt ? 'card-deal' : ''}
            `}
        >
            {/* Top-left pip */}
            <div className={`${isRed ? 'text-red-600' : 'text-gray-800'} text-lg font-bold leading-none`}>
                {rank}{suit}
            </div>

            {/* Center suit */}
            <div className="text-6xl flex justify-center items-center">
                <span className={`${isRed ? 'text-red-600' : 'text-gray-800'} drop-shadow-sm`}>
                    {suit}
                </span>
            </div>

            {/* Bottom-right pip */}
            <div className={`text-base transform rotate-180 font-bold ${isRed ? 'text-red-600' : 'text-gray-800'} leading-none`}>
                {rank}{suit}
            </div>
        </div>
    )
}
