'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Game = void 0;
// backend/src/domain/Game.ts
const Deck_1 = require('./Deck');
const Hand_1 = require('./Hand');
const uuid_1 = require('uuid'); // if you installed uuid
class Game {
  constructor() {
    this._isOver = false;
    this._winner = null;
    this.id = (0, uuid_1.v4)(); // or: `${Date.now()}-${Math.random()}`
    this.deck = new Deck_1.Deck();
    this.playerHand = new Hand_1.Hand();
    this.dealerHand = new Hand_1.Hand();
    // initial deal: 2 cards each
    this.playerHand.add(this.deck.draw());
    this.playerHand.add(this.deck.draw());
    this.dealerHand.add(this.deck.draw());
    this.dealerHand.add(this.deck.draw());
  }
  get isOver() {
    return this._isOver;
  }
  get winner() {
    return this._winner;
  }
  playerHit() {
    if (this._isOver) return;
    this.playerHand.add(this.deck.draw());
    if (this.playerHand.score() > 21) {
      this._isOver = true;
      this._winner = 'dealer';
    }
  }
  playerStand() {
    if (this._isOver) return;
    // Dealer hits until 17+
    while (this.dealerHand.score() < 17) {
      this.dealerHand.add(this.deck.draw());
    }
    this._isOver = true;
    const p = this.playerHand.score();
    const d = this.dealerHand.score();
    if (d > 21 || p > d) this._winner = 'player';
    else if (d > p) this._winner = 'dealer';
    else this._winner = 'tie';
  }
  serialize() {
    return {
      id: this.id,
      playerCards: this.playerHand.cards(),
      dealerCards: this._isOver ? this.dealerHand.cards() : [this.dealerHand.cards()[0]],
      playerScore: this.playerHand.score(),
      dealerScore: this._isOver ? this.dealerHand.score() : null,
      isOver: this._isOver,
      winner: this._winner,
    };
  }
}
exports.Game = Game;
