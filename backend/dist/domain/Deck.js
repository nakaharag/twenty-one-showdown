'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Deck = void 0;
const Card_1 = require('./Card');
class Deck {
  constructor() {
    this.cards = [];
    const suits = ['♠', '♥', '♦', '♣'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    for (const suit of suits) {
      for (const rank of ranks) {
        this.cards.push(new Card_1.Card(suit, rank));
      }
    }
    this.shuffle();
  }
  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }
  draw() {
    if (this.cards.length === 0) {
      throw new Error('No more cards in the deck');
    }
    return this.cards.pop();
  }
}
exports.Deck = Deck;
