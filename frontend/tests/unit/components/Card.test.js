import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from '@testing-library/react';
import Card from '../../../src/components/Card';
describe('Card component', () => {
    it('renders rank and suit when not hidden', () => {
        render(_jsx(Card, { rank: "A", suit: "\u2660" }));
        expect(screen.getAllByText('A♠').length).toBe(2);
        expect(screen.getAllByText('♠').length).toBeGreaterThanOrEqual(1);
    });
    it('shows placeholder when isHidden=true', () => {
        render(_jsx(Card, { rank: "K", suit: "\u2663", isHidden: true }));
        expect(screen.getByText('?')).toBeInTheDocument();
        expect(screen.queryByText('K♣')).not.toBeInTheDocument();
    });
    it('applies card-deal class when isDealt=true', () => {
        const { container } = render(_jsx(Card, { rank: "5", suit: "\u2665", isDealt: true }));
        const rootDiv = container.firstChild;
        expect(rootDiv.className).toMatch(/card-deal/);
    });
});
