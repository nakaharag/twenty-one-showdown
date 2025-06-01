import { Hand } from '../Hand'
import { Card } from '../Card'

describe('Hand.score()', () => {
    it('calculates face-value cards correctly', () => {
        const hand = new Hand()
        hand.add(new Card('♠', '2'))
        hand.add(new Card('♣', 'K'))
        expect(hand.score()).toBe(12)
    })

    it('counts aces as 11 when not bust', () => {
        const hand = new Hand()
        hand.add(new Card('♥', 'A'))
        hand.add(new Card('♦', '9'))
        expect(hand.score()).toBe(20)
    })

    it('downgrades aces to 1 to avoid bust', () => {
        const hand = new Hand()
        hand.add(new Card('♣', 'A'))
        hand.add(new Card('♣', 'A'))
        hand.add(new Card('♣', '9'))
        expect(hand.score()).toBe(21)
    })

    it('busts when over 21 even after ace downgrade', () => {
        const hand = new Hand()
        hand.add(new Card('♠', 'A'))
        hand.add(new Card('♥', 'K'))
        hand.add(new Card('♦', 'Q'))
        hand.add(new Card('♣', '2'))
        expect(hand.score()).toBe(23)
    })
})
