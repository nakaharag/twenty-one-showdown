import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Game from '../../../src/components/Game';
import { StatsProvider } from '../../../src/context/StatsContext';

const WrappedGame = (props: { apiUrl: string }) => (
    <StatsProvider>
        <Game {...props} />
    </StatsProvider>
);

describe('Game component (frontend)', () => {
    const apiUrl = 'http://localhost:4000';

    beforeEach(() => {
        (globalThis as any).fetch = undefined;
        jest.clearAllMocks();
    });

    it('initially shows "Start New Game" button', () => {
        render(<WrappedGame apiUrl={apiUrl} />);
        expect(screen.getByText(/start new game/i)).toBeInTheDocument();
    });

    it('starts a new game and displays initial cards', async () => {
        const initialGameState = {
            id: '123',
            playerCards: ['A♠', '10♥'],
            dealerCards: ['K♦'],
            playerScore: 21,
            dealerScore: null,
            isOver: false,
            winner: null,
        };

        (globalThis as any).fetch = jest.fn().mockImplementation((url, opts) => {
            if (url === `${apiUrl}/games` && opts?.method === 'POST') {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve(initialGameState),
                } as Response);
            }
            return Promise.reject(new Error('unexpected fetch call: ' + url));
        });

        render(<WrappedGame apiUrl={apiUrl} />);
        fireEvent.click(screen.getByText(/start new game/i));

        await waitFor(() => {
            expect(screen.getByText(/your hand \(21\)/i)).toBeInTheDocument();
        });

        expect(screen.getAllByText('A♠').length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText('10♥').length).toBeGreaterThanOrEqual(1);

        expect(screen.getAllByText('K♦').length).toBeGreaterThanOrEqual(1);

        expect(screen.getByText(/hit/i)).toBeInTheDocument();
        expect(screen.getByText(/stand/i)).toBeInTheDocument();
    });

    it('handles a "Hit" action and adds another card', async () => {
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
        (globalThis as any).fetch = jest.fn().mockImplementation((url, opts) => {
            if (url === `${apiUrl}/games` && opts?.method === 'POST') {
                callCount++;
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve(initial),
                } as Response);
            }
            if (url === `${apiUrl}/games/123/hit` && opts?.method === 'POST') {
                callCount++;
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve(afterHit),
                } as Response);
            }
            return Promise.reject(new Error(`unexpected fetch call: ${url}`));
        });

        render(<WrappedGame apiUrl={apiUrl} />);
        fireEvent.click(screen.getByText(/start new game/i));

        await waitFor(() => screen.getByText(/your hand \(21\)/i));

        fireEvent.click(screen.getByText(/hit/i));

        await waitFor(() => {
            expect(screen.getAllByText('5♣').length).toBeGreaterThanOrEqual(1);
        });
        expect(screen.getByText(/your hand \(26\)/i)).toBeInTheDocument();

        expect(screen.getByText(/dealer wins/i)).toBeInTheDocument();

        expect(screen.getByText(/new game/i)).toBeInTheDocument();

        expect(callCount).toBe(2);
    });

    it('displays winner and allows starting a new game', async () => {
        const finalState = {
            id: '999',
            playerCards: ['5♠', '5♣'],
            dealerCards: ['10♦', '9♥'],
            playerScore: 10,
            dealerScore: 19,
            isOver: true,
            winner: 'dealer',
        };

        (globalThis as any).fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(finalState),
        } as Response);

        render(<WrappedGame apiUrl={apiUrl} />);
        fireEvent.click(screen.getByText(/start new game/i));

        await waitFor(() => {
            const dealerHeading = screen.getByText((content) => {
                return /(dealer['’]?s hand)/i.test(content) && /\(19\)/.test(content);
            });
            expect(dealerHeading).toBeInTheDocument();
        });

        expect(screen.getByText(/dealer wins/i)).toBeInTheDocument();
        expect(screen.getByText(/new game/i)).toBeInTheDocument();
    });
});
