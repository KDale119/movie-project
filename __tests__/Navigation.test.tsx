import Navigation from '@/components/Navigation';
import { render } from '@testing-library/react';




describe('Navigation component', () => {

    it('renders correct href attributes', () => {
        const { getByText } = render(<Navigation/>);
        expect(getByText('Home').closest('a')).toHaveAttribute('href', '/');
        expect(getByText('Actors').closest('a')).toHaveAttribute('href', '/Actors');
        expect(getByText('Directors').closest('a')).toHaveAttribute('href', '/Directors');
        expect(getByText('Movies').closest('a')).toHaveAttribute('href', '/Movies');
    })
})