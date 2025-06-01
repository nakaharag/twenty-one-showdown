var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Game from '../../../src/components/Game';
import { StatsProvider } from '../../../src/context/StatsContext';
const WrappedGame = (props) => (_jsx(StatsProvider, { children: _jsx(Game, Object.assign({}, props)) }));
describe('Game component (frontend)', () => {
    const apiUrl = 'http://localhost:4000';
    beforeEach(() => {
        global.fetch = undefined;
        jest.clearAllMocks();
    });
    it('initially shows "Start New Game" button', () => {
        render(_jsx(WrappedGame, { apiUrl: apiUrl }));
        expect(screen.getByText(/start new game/i)).toBeInTheDocument();
    });
    it('starts a new game and displays initial cards', () => __awaiter(void 0, void 0, void 0, function* () {
        const initialGameState = {
            id: '123',
            playerCards: ['A♠', '10♥'],
            dealerCards: ['K♦'],
            playerScore: 21,
            dealerScore: null,
            isOver: false,
            winner: null,
        };
        global.fetch = jest.fn().mockImplementation((url, opts) => {
            if (url === `${apiUrl}/games` && (opts === null || opts === void 0 ? void 0 : opts.method) === 'POST') {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve(initialGameState),
                });
            }
            return Promise.reject(new Error('unexpected fetch call: ' + url));
        });
        render(_jsx(WrappedGame, { apiUrl: apiUrl }));
        fireEvent.click(screen.getByText(/start new game/i));
        yield waitFor(() => {
            expect(screen.getByText(/your hand \(21\)/i)).toBeInTheDocument();
        });
        expect(screen.getAllByText('A♠').length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText('10♥').length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText('K♦').length).toBeGreaterThanOrEqual(1);
        expect(screen.getByText(/hit/i)).toBeInTheDocument();
        expect(screen.getByText(/stand/i)).toBeInTheDocument();
    }));
    it('handles a "Hit" action and adds another card', () => __awaiter(void 0, void 0, void 0, function* () {
        const initial = {
            id: '123',
            playerCards: ['A♠', '10♥'],
            dealerCards: ['K♦'],
            playerScore: 21,
            dealerScore: null,
            isOver: false,
            winner: null,
        };
        const afterHit = {
            id: '123',
            playerCards: ['A♠', '10♥', '5♣'],
            dealerCards: ['K♦'],
            playerScore: 26,
            dealerScore: null,
            isOver: true,
            winner: 'dealer',
        };
        let callCount = 0;
        global.fetch = jest.fn().mockImplementation((url, opts) => {
            if (url === `${apiUrl}/games` && (opts === null || opts === void 0 ? void 0 : opts.method) === 'POST') {
                callCount++;
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve(initial),
                });
            }
            if (url === `${apiUrl}/games/123/hit` && (opts === null || opts === void 0 ? void 0 : opts.method) === 'POST') {
                callCount++;
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve(afterHit),
                });
            }
            return Promise.reject(new Error(`unexpected fetch call: ${url}`));
        });
        render(_jsx(WrappedGame, { apiUrl: apiUrl }));
        fireEvent.click(screen.getByText(/start new game/i));
        yield waitFor(() => screen.getByText(/your hand \(21\)/i));
        fireEvent.click(screen.getByText(/hit/i));
        yield waitFor(() => {
            expect(screen.getAllByText('5♣').length).toBeGreaterThanOrEqual(1);
        });
        expect(screen.getByText(/your hand \(26\)/i)).toBeInTheDocument();
        expect(screen.getByText(/dealer wins/i)).toBeInTheDocument();
        expect(screen.getByText(/new game/i)).toBeInTheDocument();
        expect(callCount).toBe(2);
    }));
    it('displays winner and allows starting a new game', () => __awaiter(void 0, void 0, void 0, function* () {
        const finalState = {
            id: '999',
            playerCards: ['5♠', '5♣'],
            dealerCards: ['10♦', '9♥'],
            playerScore: 10,
            dealerScore: 19,
            isOver: true,
            winner: 'dealer',
        };
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(finalState),
        });
        render(_jsx(WrappedGame, { apiUrl: apiUrl }));
        fireEvent.click(screen.getByText(/start new game/i));
        yield waitFor(() => {
            const dealerHeading = screen.getByText((content) => {
                return /(dealer['’]?s hand)/i.test(content) && /\(19\)/.test(content);
            });
            expect(dealerHeading).toBeInTheDocument();
        });
        expect(screen.getByText(/dealer wins/i)).toBeInTheDocument();
        expect(screen.getByText(/new game/i)).toBeInTheDocument();
    }));
});
