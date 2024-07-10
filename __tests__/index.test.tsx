import '@testing-library/jest-dom'
import { render } from '@testing-library/react';

import Navigation from '@/components/Navigation';
import Home from '@/pages';

describe('Home component', () => {
    test('renders Navigation component', () => {
        const { getByTestId } = render(<Home />);
        const navigationElement = getByTestId('navigation');
        expect(navigationElement).toBeInTheDocument();
    });

    test('renders Image component', () => {
        const { getByAltText } = render(<Home />);

        const popcornImage = getByAltText('Popcorn');
        expect(popcornImage).toBeInTheDocument();
        expect(popcornImage).toHaveAttribute('width', '150');
        expect(popcornImage).toHaveAttribute('height', '150');

        const sodaImage = getByAltText('Soda');
        expect(sodaImage).toBeInTheDocument();
        expect(sodaImage).toHaveAttribute('width', '225');
        expect(sodaImage).toHaveAttribute('height', '150');

        const directorsBoardImage = getByAltText('Directors Board');
        expect(directorsBoardImage).toBeInTheDocument();
        expect(directorsBoardImage).toHaveAttribute('width', '225');
        expect(directorsBoardImage).toHaveAttribute('height', '150');

        const candyImage = getByAltText('Candy');
        expect(candyImage).toBeInTheDocument();
        expect(candyImage).toHaveAttribute('width', '225');
        expect(candyImage).toHaveAttribute('height', '150');

        const movieReelImage = getByAltText('Movie Reel');
        expect(movieReelImage).toBeInTheDocument();
        expect(movieReelImage).toHaveAttribute('width', '225');
        expect(movieReelImage).toHaveAttribute('height', '100');
    });
});
