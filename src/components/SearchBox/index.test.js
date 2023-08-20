import { screen, render, fireEvent } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../../store';
import SearchBox from "./index";

test('Test search button', ()=>{
    const fakeHistory = createMemoryHistory();
    render(
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Router location={fakeHistory} navigator={fakeHistory}>
                    <SearchBox />
                </Router>
            </PersistGate>
        </Provider>
    )
    const searchButton = screen.getByRole('button');
    fireEvent.click(searchButton);
    expect(fakeHistory.location.pathname).toEqual('/search-result');
});