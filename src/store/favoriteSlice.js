import {createSlice, createEntityAdapter} from '@reduxjs/toolkit';

const favoritesAdapter = createEntityAdapter();

const initialState = favoritesAdapter.getInitialState();

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorite: (state, action) => favoritesAdapter.addOne(state, action.payload),
        removeFavorite: (state, action) => favoritesAdapter.removeOne(state, action.payload)
    }
})

export const {addFavorite, removeFavorite} = favoritesSlice.actions;

export const {
    selectAll: selectAllFavorites,
    selectIds: selectFavoritesIds
} = favoritesAdapter.getSelectors(state => state.favorites);

export default favoritesSlice.reducer;