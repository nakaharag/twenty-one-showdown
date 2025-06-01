import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '../../../src/components/Card';

describe('Card component', () => {
    it('renders rank and suit when not hidden', () => {
        render(<Card rank="A" suit="♠" />);
        expect(screen.getAllByText('A♠').length).toBe(2);
        expect(screen.getAllByText('♠').length).toBeGreaterThanOrEqual(1);
    });

    it('shows placeholder when isHidden=true', () => {
        render(<Card rank="K" suit="♣" isHidden={true} />);
        expect(screen.getByText('?')).toBeInTheDocument();
        expect(screen.queryByText('K♣')).not.toBeInTheDocument();
    });

    it('applies card-deal class when isDealt=true', () => {
        const { container } = render(<Card rank="5" suit="♥" isDealt={true} />);
        const rootDiv = container.firstChild as HTMLElement;
        expect(rootDiv.className).toMatch(/card-deal/);
    });
});
