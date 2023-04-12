import {combineReducers, configureStore} from "@reduxjs/toolkit";


const rootReducer = combineReducers({

})

export const setupStore = ()=> configureStore({
    reducer: rootReducer
})