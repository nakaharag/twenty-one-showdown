import express from 'express';
import cors from 'cors';
import { Game } from './domain/Game';

const app = express();
app.use(cors(), express.json());

const games = new Map<string, Game>();

app.post('/games', (req, res) => {
  const game = new Game();
  games.set(game.id, game);
  res.json(game.serialize());
});

app.post('/games/:id/hit', (req, res) => {
  const game = games.get(req.params.id)!;
  game.playerHit();
  res.json(game.serialize());
});

app.post('/games/:id/stand', (req, res) => {
  const game = games.get(req.params.id)!;
  game.playerStand();
  res.json(game.serialize());
});

app.get('/games/:id', (req, res) => {
  res.json(games.get(req.params.id)!.serialize());
});

app.listen(4000, () => console.log('API listening on :4000'));
