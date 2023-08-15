import { combineReducers, configureStore } from '@reduxjs/toolkit';
import favoriteReducer from './favoriteSlice';
import searchingReducer from './searchingSlice';
import calendarReducer from './calendarSlice';
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['favorites', 'calendar']
}

const rootReducer = combineReducers({
    favorites: favoriteReducer,
    searching: searchingReducer,
    calendar: calendarReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store  = configureStore({
    reducer: persistedReducer
});

export const persistor = persistStore(store);