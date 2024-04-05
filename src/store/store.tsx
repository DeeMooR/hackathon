import { combineReducers, configureStore } from "@reduxjs/toolkit";
import eventsSlice from "./eventsSlice";

const rootReducer = combineReducers({
  events: eventsSlice
})

const store = configureStore({
  reducer: rootReducer
})

export default store;