import { combineReducers, configureStore } from '@reduxjs/toolkit';
import favoriteReducer from './favoriteSlice';
import searchingReducer from './searchingSlice';
import calendarReducer from './calendarSlice';

const rootReducer = combineReducers({
    favorites: favoriteReducer,
    searching: searchingReducer,
    calendar: calendarReducer
});

const store  = configureStore({
    reducer: rootReducer
});

export default store;