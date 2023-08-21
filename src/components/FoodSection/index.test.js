import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../../store";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import fetchMock from "jest-fetch-mock";
import FoodSection from ".";

describe('Test FoodSection component', ()=>{
    const fakeHistory = createMemoryHistory();
    const originalEnv = process.env;

    beforeAll(()=>{
        fetchMock.enableMocks()
        process.env = {
            REACT_APP_TASTY_API_KEY: 'FAKE_API_KEY'
        }
    });

    beforeEach(()=>{
        fetch.resetMocks();
        render(
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <Router location={fakeHistory} navigator={fakeHistory}>
                        <FoodSection keyword="spicy" title="Spicy Lover"/>
                    </Router>
                </PersistGate>
            </Provider>
        );
    });

    afterAll(()=>{
        process.env = originalEnv;
        fetchMock.disableMocks();
    });

    test('Title is displayed', ()=>{
        const titleElement = screen.getByText('Spicy Lover');
        expect(titleElement).toBeInTheDocument();
    })

    test('View more link is displayed', ()=>{
        const viewMoreLink = screen.getByRole('button', {name:'View More'});
        fireEvent.click(viewMoreLink);
        expect(fakeHistory.location.pathname).toEqual('/search-result');
    })

    test('Call API after clicking on view more', async ()=>{
        const viewMoreLink = screen.getByRole('button', {name:'View More'});
        fireEvent.click(viewMoreLink);
        waitFor(() => {
            expect(fetch.mock.calls.length).toEqual(1);
        })
    })
});