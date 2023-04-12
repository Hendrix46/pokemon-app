import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {pokemonSlice} from './reducers/index'

const rootReducer = combineReducers({
    pokemonSlice : pokemonSlice.reducer
})

export const store = configureStore({
    reducer: rootReducer
})