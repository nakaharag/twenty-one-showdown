import { Card } from './Card';

export class Deck {
  private cards: Card[] = [];

  constructor() {
    const suits = ['♠', '♥', '♦', '♣'] as const;
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] as const;

    for (const suit of suits) {
      for (const rank of ranks) {
        this.cards.push(new Card(suit, rank));
      }
    }
    this.shuffle();
  }

  private shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  public draw(): Card {
    if (this.cards.length === 0) {
      throw new Error('No more cards in the deck');
    }
    return this.cards.pop()!;
  }
}
