'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Card = void 0;
class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
  }
  toString() {
    return `${this.rank}${this.suit}`;
  }
}
exports.Card = Card;
