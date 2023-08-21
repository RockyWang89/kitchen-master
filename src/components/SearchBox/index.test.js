import { screen, render, fireEvent } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../../store';
import SearchBox from "./index";

describe('Test SearchBox Component', ()=>{
    const fakeHistory = createMemoryHistory();

    beforeEach(()=>{
        render(
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <Router location={fakeHistory} navigator={fakeHistory}>
                        <SearchBox />
                    </Router>
                </PersistGate>
            </Provider>
        )
    });

    test('Test search button', ()=>{
        const searchButton = screen.getByRole('button');
        fireEvent.click(searchButton);
        expect(fakeHistory.location.pathname).toEqual('/search-result');
    });
    
    test('Typed text appears on text box', ()=>{
        const inputBox = screen.getByTestId('input-box');
        fireEvent.change(inputBox, { target: { value: 'cake' } });
        expect(inputBox).toHaveValue('cake');
    });
});