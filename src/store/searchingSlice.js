import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import store from './index';
import { API_KEY, PAGE_SIZE } from "../static";

const initialState = {
    currentPage: 0,
    keyword: "",
    hasNextPage: true,
    loading: false,
    searchResult: []
};

export const searchByKeyword = createAsyncThunk("searching/searchByKeyword", async (keyword) => {
    try {
        const res = await axios.request({
            method: 'GET',
            url: 'https://tasty.p.rapidapi.com/recipes/list',
            params: {
              from: '0',
              size: PAGE_SIZE,
              q: keyword
            },
            headers: {
              'X-RapidAPI-Key': API_KEY,
              'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
            } 
        });
        return {
            keyword,
            results: res.data.results
        };
    }
    catch(err) {
        console.error(err);
    }
});

export const fetchMoreData = createAsyncThunk("searching/fetchMoreData", async () => {
    try {
        const res = await axios.request({
            method: 'GET',
            url: 'https://tasty.p.rapidapi.com/recipes/list',
            params: {
              from: PAGE_SIZE * store.getState().searching.currentPage,
              size: PAGE_SIZE,
              q: store.getState().searching.keyword
            },
            headers: {
              'X-RapidAPI-Key': API_KEY,
              'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
            } 
        });
        return res.data.results;
    }
    catch(err) {
        console.error(err);
    }
});

const searchingSlice = createSlice({
    name: "searching",
    initialState,
    reducers: {
        setLoadingTrue: (state) => {
            state.loading = true;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(searchByKeyword.fulfilled, (state, action) => {
            if(action.payload.length < 16) {
                state.hasNextPage = false;
            }
            state.currentPage = 1;
            state.searchResult = [...action.payload.results];
            state.keyword = action.payload.keyword;
        })
        .addCase(fetchMoreData.fulfilled, (state, action) => {
            if(action.payload.length < 16) {
                state.hasNextPage = false;
            }
            state.loading = false;
            state.currentPage = state.currentPage + 1;
            state.searchResult = [...state.searchResult, ...action.payload];
        })
    }
});

export const { setLoadingTrue } = searchingSlice.actions;

export const selectKeyword = state => state.searching.keyword;

export const selectSearchResult = state => state.searching.searchResult;

export const selectHasNextPage = state => state.searching.hasNextPage;

export const selectLoading = state => state.searching.loading;

export default searchingSlice.reducer;