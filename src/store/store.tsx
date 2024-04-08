import { combineReducers, configureStore } from "@reduxjs/toolkit";
import mainSlice from "./mainSlice";

const rootReducer = combineReducers({
  main: mainSlice
})

const store = configureStore({
  reducer: rootReducer
})

export default store;