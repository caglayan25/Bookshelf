import { combineReducers, createStore } from "redux";

import booksReducer from "./reducers/booksReducers";
import categoriesReducer from "./reducers/categoriesReducer";

const roootReducer=combineReducers({
    booksState:booksReducer,
    categoriesState:categoriesReducer,
})

const store=createStore(roootReducer)


export default store