import { Deck } from '../Deck';
import { Card } from '../Card';

describe('Deck', () => {
    it('initializes with 52 unique cards', () => {
        const deck = new Deck();

        const drawnStrings = new Set<string>();
        for (let i = 0; i < 52; i++) {
            const card = deck.draw();
            drawnStrings.add(card.toString());
        }

        expect(drawnStrings.size).toBe(52);
    });

    it('throws an error when drawing from an empty deck', () => {
        const deck = new Deck();
        for (let i = 0; i < 52; i++) {
            deck.draw();
        }

        expect(() => deck.draw()).toThrowError('No more cards in the deck');
    });

    it('produces a shuffled deck (not in perfectly sorted order)', () => {
        const suits = ['♠', '♥', '♦', '♣'] as const;
        const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] as const;
        const sortedOrder: string[] = [];
        for (const suit of suits) {
            for (const rank of ranks) {
                sortedOrder.push(`${rank}${suit}`);
            }
        }

        const deck = new Deck();
        const drawnAll: string[] = [];
        for (let i = 0; i < 52; i++) {
            drawnAll.push(deck.draw().toString());
        }

        expect(drawnAll).not.toEqual(sortedOrder);
    });

    it('draw() returns a Card instance', () => {
        const deck = new Deck();
        const card = deck.draw();
        expect(card).toBeInstanceOf(Card);
    });
});
