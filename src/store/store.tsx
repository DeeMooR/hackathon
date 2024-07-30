import { configureStore } from "@reduxjs/toolkit";
import { eventsReduces } from "./slices";
 
const store = configureStore({
  reducer: {
    events: eventsReduces
  }
})

export default store;