'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
// backend/src/server.ts
const express_1 = __importDefault(require('express'));
const cors_1 = __importDefault(require('cors'));
const Game_1 = require('./domain/Game');
const app = (0, express_1.default)();
app.use((0, cors_1.default)(), express_1.default.json());
const games = new Map();
app.post('/games', (req, res) => {
  const game = new Game_1.Game();
  games.set(game.id, game);
  res.json(game.serialize());
});
app.post('/games/:id/hit', (req, res) => {
  const game = games.get(req.params.id);
  game.playerHit();
  res.json(game.serialize());
});
app.post('/games/:id/stand', (req, res) => {
  const game = games.get(req.params.id);
  game.playerStand();
  res.json(game.serialize());
});
app.get('/games/:id', (req, res) => {
  res.json(games.get(req.params.id).serialize());
});
app.listen(4000, () => console.log('API listening on :4000'));
