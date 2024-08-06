import { configureStore } from "@reduxjs/toolkit";
import { mainReducer, adminReducer, eventsReducer, eventReducer } from "./slices";
 
const store = configureStore({
  reducer: {
    main: mainReducer,
    events: eventsReducer,
    event: eventReducer,
    admin: adminReducer,
  }
})

export default store;