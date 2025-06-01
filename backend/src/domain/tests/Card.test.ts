import { Card, Suit, Rank } from '../Card';

describe('Card', () => {
    it('correctly constructs with given suit and rank', () => {
        const card = new Card('♠', 'A');
        expect(card.suit).toBe('♠');
        expect(card.rank).toBe('A');
    });

    it('toString() returns rank followed by suit', () => {
        const cases: Array<{ suit: Suit; rank: Rank; expected: string }> = [
            { suit: '♠', rank: 'A', expected: 'A♠' },
            { suit: '♥', rank: '10', expected: '10♥' },
            { suit: '♦', rank: 'J', expected: 'J♦' },
            { suit: '♣', rank: 'K', expected: 'K♣' },
        ];

        cases.forEach(({ suit, rank, expected }) => {
            const card = new Card(suit, rank);
            expect(card.toString()).toBe(expected);
        });
    });
});
