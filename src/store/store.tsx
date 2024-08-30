import { configureStore } from "@reduxjs/toolkit";
import { mainReducer, adminReducer, eventsReducer, eventReducer, modalReducer, emailReducer } from "./slices";
 
const store = configureStore({
  reducer: {
    main: mainReducer,
    events: eventsReducer,
    event: eventReducer,
    admin: adminReducer,
    modal: modalReducer,
    email: emailReducer,
  }
})

export default store;