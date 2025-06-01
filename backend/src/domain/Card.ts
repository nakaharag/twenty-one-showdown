export type Suit = '♠' | '♥' | '♦' | '♣';
export type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

export class Card {
  constructor(
    public suit: Suit,
    public rank: Rank,
  ) {}

  public toString() {
    return `${this.rank}${this.suit}`;
  }
}
