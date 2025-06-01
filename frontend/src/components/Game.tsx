import React, { useState, useEffect } from 'react'
import Button from './Button'
import Card from './Card'
import { useStats } from '../context/StatsContext'

type CardType = string

interface GameState {
  id: string
  playerCards: CardType[]
  dealerCards: CardType[]
  playerScore: number
  dealerScore: number | null
  isOver: boolean
  winner: 'player' | 'dealer' | 'tie' | null
}

interface GameProps {
  apiUrl: string
}

type Suit = '♠' | '♥' | '♦' | '♣'

const parseCard = (c: CardType): [string, Suit] => {
  const match = c.match(/(10|[2-9]|[AJQK])(.+)/)
  return match ? [match[1], match[2] as Suit] : ['', '♠']
}

export default function Game({ apiUrl }: GameProps) {
  const [state, setState] = useState<GameState | null>(null)
  const [recorded, setRecorded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [dealingCards, setDealingCards] = useState(false)

  const {
    wins,
    losses,
    ties,
    totalGames,
    recordWin,
    recordLoss,
    recordTie,
  } = useStats()

  const fetchGame = async (path: string, method: 'GET' | 'POST' = 'GET') => {
    try {
      setIsLoading(true)
      const res = await fetch(`${apiUrl}${path}`, { method })
      if (!res.ok) {
        console.error(`Backend error [${method} ${path}]:`, res.status, await res.text())
        return
      }
      const json: GameState = await res.json()

      if (method === 'POST' && path === '/games') {
        setDealingCards(true)
        setTimeout(() => {
          setState(json)
          setDealingCards(false)
        }, 500)
      } else {
        setState(json)
      }
    } catch (err) {
      console.error(`Network error [${method} ${path}]:`, err)
    } finally {
      setIsLoading(false)
    }
  }

  const startGame = () => {
    setState(null)
    setRecorded(false)
    fetchGame('/games', 'POST')
  }

  const hit = () => {
    if (state && !isLoading) fetchGame(`/games/${state.id}/hit`, 'POST')
  }

  const stand = () => {
    if (state && !isLoading) fetchGame(`/games/${state.id}/stand`, 'POST')
  }

  useEffect(() => {
    if (state?.isOver && !recorded) {
      if (state.winner === 'tie') recordTie()
      else if (state.winner === 'player') recordWin()
      else if (state.winner === 'dealer') recordLoss()
      setRecorded(true)
    }
  }, [state, recorded, recordTie, recordWin, recordLoss])

  const renderCard = (c: CardType, idx: number, isHidden: boolean = false) => {
    const [rank, suit] = parseCard(c)
    return (
        <Card
            key={`${idx}-${rank}${suit}`}
            rank={rank}
            suit={suit}
            isDealt={dealingCards}
            isHidden={isHidden}
        />
    )
  }

  const getWinRate = () => {
    return totalGames > 0 ? ((wins / totalGames) * 100).toFixed(1) : '0.0'
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
        <div className="max-w-5xl mx-auto">
          {/* Enhanced Stats Display */}
          <div className="mb-8 glass-morphism rounded-xl p-6" data-testid="stats-display">
            <h2
                className="text-4xl font-bold text-center mb-6"
                style={{ color: 'rgba(139, 92, 246, 0.8)' }}
            >
              Game Stats
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              <div
                  className="bg-green-500/20 rounded-lg p-4 border border-green-500/30"
                  data-testid="wins-stat"
              >
                <div className="text-3xl font-bold text-green-400" data-testid="wins-count">
                  {wins}
                </div>
                <div className="text-sm text-white font-medium">Wins</div>
              </div>
              <div className="bg-red-500/20 rounded-lg p-4 border border-red-500/30">
                <div className="text-3xl font-bold text-red-400">{losses}</div>
                <div className="text-sm text-white font-medium">Losses</div>
              </div>
              <div className="bg-yellow-500/20 rounded-lg p-4 border border-yellow-500/30">
                <div className="text-3xl font-bold text-yellow-400">{ties}</div>
                <div className="text-sm text-white font-medium">Ties</div>
              </div>
              <div className="bg-blue-500/20 rounded-lg p-4 border border-blue-500/30">
                <div className="text-3xl font-bold text-blue-400">{totalGames}</div>
                <div className="text-sm text-white font-medium">Total</div>
              </div>
              <div className="bg-purple-500/20 rounded-lg p-4 border border-purple-500/30">
                <div className="text-3xl font-bold text-purple-400">{getWinRate()}%</div>
                <div className="text-sm text-white font-medium">Win Rate</div>
              </div>
            </div>
          </div>

          {/* Game Area */}
          {!state ? (
              <div
                  className="flex flex-col items-center justify-center min-h-[500px] glass-morphism rounded-xl p-8"
                  data-testid="welcome-screen"
              >
                <div className="text-8xl mb-8 animate-bounce">🃏</div>
                <h2 className="text-3xl font-bold text-white mb-8">Ready to play?</h2>
                <Button onClick={startGame} variant="primary" disabled={isLoading}>
                  {isLoading ? 'Dealing...' : 'Start New Game'}
                </Button>
              </div>
          ) : (
              <div className="space-y-8" data-testid="game-area">
                {/* Dealer Hand */}
                <div className="glass-morphism rounded-xl p-6" data-testid="dealer-hand">
                  <h2 className="text-white text-2xl font-bold mb-6 text-center">
                    Dealer's Hand {state.isOver ? `(${state.dealerScore})` : ''}
                  </h2>
                  <div className="flex justify-center flex-wrap gap-4" data-testid="dealer-cards">
                    {state.dealerCards.map((card, idx) => {
                      // Hide second card until game is over
                      const shouldHide = !state.isOver && idx === 1
                      return renderCard(card, idx, shouldHide)
                    })}

                    {/* If dealer has fewer than 2 cards and game still in progress, show a hidden placeholder */}
                    {!state.isOver && state.dealerCards.length < 2 && (
                        <Card key="hidden-placeholder" rank="?" suit="♠" isHidden />
                    )}
                  </div>
                </div>

                {/* Player Hand */}
                <div className="glass-morphism rounded-xl p-6" data-testid="player-hand">
                  <h2 className="text-white text-2xl font-bold mb-6 text-center">
                    Your Hand ({state.playerScore})
                  </h2>
                  <div className="flex justify-center flex-wrap gap-4" data-testid="player-cards">
                    {state.playerCards.map((card, idx) => renderCard(card, idx, false))}
                  </div>
                </div>

                {/* Game Controls */}
                {!state.isOver ? (
                    <div className="flex justify-center space-x-6" data-testid="game-controls">
                      <Button onClick={hit} variant="primary" disabled={isLoading}>
                        {isLoading ? 'Dealing...' : 'Hit'}
                      </Button>
                      <Button onClick={stand} variant="secondary" disabled={isLoading}>
                        Stand
                      </Button>
                    </div>
                ) : (
                    <div className="text-center space-y-8" data-testid="game-over">
                      <div
                          className={`text-4xl font-bold ${
                              state.winner === 'player'
                                  ? 'text-emerald-300 animate-pulse drop-shadow-lg'
                                  : state.winner === 'dealer'
                                      ? 'text-red-300 drop-shadow-lg'
                                      : 'text-amber-300 drop-shadow-lg'
                          }`}
                      >
                        {state.winner === 'tie'
                            ? "It's a tie! 🤝"
                            : state.winner === 'player'
                                ? 'You win! 🎉'
                                : 'Dealer wins 😔'}
                      </div>
                      <Button onClick={startGame} variant="success">
                        New Game
                      </Button>
                    </div>
                )}
              </div>
          )}
        </div>
      </div>
  )
}
