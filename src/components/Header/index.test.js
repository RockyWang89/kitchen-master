import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../../store';
import Header from './index';

test('render Navbar component', ()=>{
    const fakeHistory = createMemoryHistory();
    render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router location={fakeHistory} navigator={fakeHistory}>
                    <Header />
                </Router>
            </PersistGate>
        </Provider>
    );
    expect(screen.getByText('Kitchen Master')).toBeInTheDocument();
});