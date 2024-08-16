import { configureStore } from "@reduxjs/toolkit";
import { mainReducer, adminReducer, eventsReducer, eventReducer, modalReducer } from "./slices";
 
const store = configureStore({
  reducer: {
    main: mainReducer,
    events: eventsReducer,
    event: eventReducer,
    admin: adminReducer,
    modal: modalReducer,
  }
})

export default store;