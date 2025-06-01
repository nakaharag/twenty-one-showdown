'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Hand = void 0;
class Hand {
  constructor() {
    this._cards = [];
  }
  add(card) {
    this._cards.push(card);
  }
  cards() {
    return this._cards.map((c) => `${c.rank}${c.suit}`);
  }
  score() {
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
exports.Hand = Hand;
