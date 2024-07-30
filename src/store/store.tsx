import { configureStore } from "@reduxjs/toolkit";
import { adminReducer, eventsReducer } from "./slices";
 
const store = configureStore({
  reducer: {
    events: eventsReducer,
    admin: adminReducer,
  }
})

export default store;