# Twenty-One Showdown

A fully-featured online Blackjack (Twenty-One) game, built with a modern frontend (React + Vite + Tailwind CSS) and a Node/Express/TypeScript backend. Track your wins/losses/ties via `localStorage` and React Context. Dockerized for easy development (with HMR) and production.

---

## Table of Contents

1. [Live Demo](#live-demo)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Getting Started](#getting-started)
    1. [Prerequisites](#prerequisites)
    2. [Clone & Install](#clone--install)
    3. [Development Mode (with HMR)](#development-mode-with-hmr)
    4. [Production Build (Docker + Nginx)](#production-build-docker--nginx)
6. [Backend API Endpoints](#backend-api-endpoints)
7. [Testing](#testing)
8. [Styling & Theming](#styling--theming)
9. [Context & State Management](#context--state-management)
10. [Docker Configuration](#docker-configuration)
11. [Contributing](#contributing)
12. [License](#license)

---

## Live Demo

https://twenty-one-showdown-1.onrender.com/

---

## Features

- **Classic Blackjack Gameplay**
    - Deal 2 cards to player and dealer
    - “Hit” to draw another card, “Stand” to end turn
    - Dealer auto-plays until reaching 17+
    - Ace handling (11 or 1) and face-card values
    - Hidden dealer card until game end
- **Responsive, Polished UI**
    - Fully responsive grid layout for cards (min-width 4 rem per card)
    - Hover/“deal” animations using Tailwind transitions
    - Custom card design via gradient backgrounds and drop shadows
    - Glass-morphism panels for stats and gameplay area
- **Statistics Dashboard**
    - Tracks Wins, Losses, Ties, Total Games, Win Rate
    - Persists in `localStorage` so stats survive page reloads
    - Displays a colorful “dashboard” above the game board
- **Real-Time State Management**
    - React Context (`StatsContext`) for centralized stats
    - `useEffect` hooks detect game end to update stats once
- **Loading & Dealing Animations**
    - “Dealing…” button states and card-dealing delay
    - Spinner/emoji bounce animation when waiting for deal
- **Dockerized Development & Production**
    - **Dev**: Vite + Node backend with HMR in separate containers
    - **Prod**: Multi-stage builds → static frontend served by Nginx + compiled Node API
- **TypeScript Everywhere**
    - Type checked React components, context, and backend logic
    - Domain classes: `Card`, `Deck`, `Hand`, `Game` enforce OOP and encapsulation
- **ESLint + Prettier**
    - Consistent code style across frontend and backend
    - Pre-commit linting (optional) via Husky (configurable)
- **Tailwind CSS Custom Theme**
    - Utilities for gradients, shadows, and aspect-ratio for cards

---

## Tech Stack

| Layer                   | Technologies                    |
|-------------------------|----------------------------------|
| **Frontend**            | React 18, Vite, TypeScript, Tailwind CSS, React Context API |
| **Styling**             | Tailwind CSS (with custom colors), CSS resets |
| **Backend**             | Node.js 18 (LTS), Express, TypeScript |
| **Domain Logic**        | OOP Classes: `Card`, `Deck`, `Hand`, `Game` |
| **State & Persistence** | React Context, `localStorage`    |
| **Testing**             | Jest (unit tests), Supertest (integration tests), Cypress (E2E) |
| **Lint & Format**       | ESLint 8, Prettier, `@typescript-eslint` |
| **Containerization**    | Docker, Docker Compose, Nginx    |

---

## Project Structure

```
/
├── backend/
│   ├── src/
│   │   ├── domain/
│   │   │   ├── Card.ts
│   │   │   ├── Deck.ts
│   │   │   ├── Hand.ts
│   │   │   └── Game.ts
│   │   ├── tests/
│   │   │   ├── Card.test.ts
│   │   │   ├── Hand.test.ts
│   │   │   └── Game.test.ts
│   │   ├── server.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── Dockerfile
│   └── Dockerfile.dev
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Game.tsx
│   │   ├── context/
│   │   │   └── StatsContext.tsx
│   │   ├── index.css
│   │   ├── main.tsx
│   │   ├── App.tsx
│   ├── public/
│   │   └── index.html
│   ├── tailwind.config.cjs
│   ├── postcss.config.cjs
│   ├── package.json
│   ├── tsconfig.json
│   ├── Dockerfile
│   └── Dockerfile.dev
│
├── docker-compose.yml
├── .eslintrc.cjs
├── .prettierrc
└── README.md
```

## Getting Started

### Prerequisites

- [Node.js 18+ (LTS)](https://nodejs.org/en/)
- [npm 9+](https://docs.npmjs.com/cli/v9/commands/npm-install) (bundled with Node.js)
- [Docker](https://docs.docker.com/get-docker/) & [Docker Compose](https://docs.docker.com/compose/install/) (for containerized dev/production)

---

### Clone & Install

```bash
git clone https://github.com/yourusername/twenty-one-showdown.git
cd twenty-one-showdown

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
cp .env.example .env 
npm install
```

### Development Mode (with HMR)

This setup uses two dev containers (backend + frontend) enabling HMR:

1.	Ensure Docker is running.
2. From the project root, run:

   `docker-compose up --build`

   - backend-dev: exposes port 4000 (Express API with ts-node-dev).
   - frontend-dev: exposes port 3000 which proxies to Vite’s 5173 for React HMR.
3. Open your browser at http://localhost:3000.

   `docker-compose up --build`

    - Backend logs appear in the twenty-one-backend-dev container logs.
     - Frontend hot-reloads on any src/**/* changes.

### Backend API Endpoints
| Method | Endpoint                | Description                          | Response Body |
|--------|-------------------------|--------------------------------------|--------|
| POST   | /games         | Start a new game                      | `{ id, playerCards, dealerCards (1 shown), playerScore, dealerScore: null, isOver: false, winner: null }` |
| POST   | /games/:gameId/hit   | Player hits (draws a card)            | `Updated game state (may have isOver: true if bust)` |
| POST   | /games/:gameId/stand | Player stands (ends turn)             | `Final game state with full dealerCards and dealerScore` |
| GET      | /games/:gameId        | Get game state by ID                   | `Current game state` |

## Testing

### Backend Unit & Integration Tests
1.	Navigate to backend/:
```bash
cd backend
``` 

2.	Run tests (Jest + Supertest):
```bash
npm test
```

3.Coverage report:
```bash
npm run test:coverage
```
Output will appear in backend/coverage/.

### Frontend

1. Navigate to frontend/:
```bash
cd frontend
```
2. Run tests (Jest + React Testing Library):
```bash
npm run test
```

## Linting & Formatting
### ESLint
- Run ESLint on backend:
```bash
cd backend
npm run lint
```
- Run ESLint on frontend:
```bash
cd frontend
npm run lint
```
### Prettier
- Format all files in backend:
```bash
cd backend
npm run format
```
- Format all files in frontend:
```bash
cd frontend
npm run format
```

### License
This project is licensed under the MIT License.
