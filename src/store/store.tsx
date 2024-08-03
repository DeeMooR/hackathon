import { configureStore } from "@reduxjs/toolkit";
import { adminReducer, eventsReducer, eventReducer } from "./slices";
 
const store = configureStore({
  reducer: {
    events: eventsReducer,
    event: eventReducer,
    admin: adminReducer,
  }
})

export default store;