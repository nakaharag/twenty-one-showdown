import { Game } from '../Game'

describe('Game flow', () => {
    it('initializes player and dealer with 2 cards each', () => {
        const game = new Game()
        const state = game.serialize()
        expect(state.playerCards).toHaveLength(2)
        expect(state.dealerCards).toHaveLength(1)
        expect(state.isOver).toBe(false)
    })

    it('player busts after hit over 21', () => {
        const game = new Game()
        while (!game.serialize().isOver) {
            game.playerHit()
        }
        const final = game.serialize()
        expect(final.isOver).toBe(true)
        expect(final.winner).toBe('dealer')
    })
})
