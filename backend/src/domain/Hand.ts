import { Card } from './Card';

export class Hand {
  private _cards: Card[] = [];

  public add(card: Card) {
    this._cards.push(card);
  }

  public cards(): string[] {
    return this._cards.map((c) => `${c.rank}${c.suit}`);
  }

  public score(): number {
    let total = 0;
    let aces = 0;

    for (const c of this._cards) {
      if (c.rank === 'A') {
        aces++;
        total += 11;
      } else if (['J', 'Q', 'K'].includes(c.rank)) {
        total += 10;
      } else {
        total += Number(c.rank);
      }
    }

    while (total > 21 && aces > 0) {
      total -= 10;
      aces--;
    }

    return total;
  }
}
