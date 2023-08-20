import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import Navbar from './index';

describe('Test Navbar', ()=>{
    const fakeHistory = createMemoryHistory();

    beforeEach(()=>{
        render(
            <Router location={fakeHistory} navigator={fakeHistory}>
                <Navbar />
            </Router>
        );        
    });

    test('Find home page link', ()=>{
        const homeLink = screen.getByText('Home');
        expect(homeLink).toBeInTheDocument();
        fireEvent.click(homeLink);
        expect(fakeHistory.location.pathname).toEqual('/');
    });

    test('Find favorites page link', ()=>{
        const favoritesLink = screen.getByRole('link', { name: 'Favorites' });
        expect(favoritesLink).toBeInTheDocument();
        fireEvent.click(favoritesLink);
        expect(fakeHistory.location.pathname).toEqual('/favorites');
    });

    test('Find calendar page link', ()=>{
        const calendarLink = screen.getByText('Calendar');
        expect(calendarLink).toBeInTheDocument();
        fireEvent.click(calendarLink);
        expect(fakeHistory.location.pathname).toEqual('/calendar');
    });
});