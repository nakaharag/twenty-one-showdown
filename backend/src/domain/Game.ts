import { Deck } from './Deck';
import { Hand } from './Hand';
import { v4 as uuidv4 } from 'uuid';

export interface GameState {
  id: string;
  playerCards: string[];
  dealerCards: string[];
  playerScore: number;
  dealerScore: number | null;
  isOver: boolean;
  winner: 'player' | 'dealer' | 'tie' | null;
}

export class Game {
  public id: string;
  private deck: Deck;
  private playerHand: Hand;
  private dealerHand: Hand;
  private _isOver = false;
  private _winner: 'player' | 'dealer' | 'tie' | null = null;

  constructor() {
    this.id = uuidv4();
    this.deck = new Deck();
    this.playerHand = new Hand();
    this.dealerHand = new Hand();

    this.playerHand.add(this.deck.draw());
    this.playerHand.add(this.deck.draw());
    this.dealerHand.add(this.deck.draw());
    this.dealerHand.add(this.deck.draw());
  }

  public get isOver() {
    return this._isOver;
  }

  public get winner() {
    return this._winner;
  }

  public playerHit() {
    if (this._isOver) return;
    this.playerHand.add(this.deck.draw());
    if (this.playerHand.score() > 21) {
      this._isOver = true;
      this._winner = 'dealer';
    }
  }

  public playerStand() {
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

  public serialize(): GameState {
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
