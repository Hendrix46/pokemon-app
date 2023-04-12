import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "../../constants";

export const fetchPokemonData = createAsyncThunk(
    "pokemon/fetchPokemonData",
    async (params) => {
        const { perPage, currentPage } = params;
        const res = await axios.get(
            `${BASE_URL}?limit=${perPage}&offset=${(currentPage - 1) * perPage}`
        );

        const pokemonRequests = res.data.results.map((item) => axios.get(item.url));
        const pokemonResponses = await Promise.all(pokemonRequests);
        const pokemonData = pokemonResponses.map((response) => response.data);

        return pokemonData;
    }
);

export const pokemonSlice = createSlice({
    name: "pokemon",
    initialState: {
        pokeData: [],
        loading: false,
        disable: true,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPokemonData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchPokemonData.fulfilled, (state, action) => {
            state.loading = false;
            state.pokeData = action.payload;
            if (action.payload.previous != null) {
                state.disable = false;
            } else {
                state.disable = true;
            }
        });
    },
});