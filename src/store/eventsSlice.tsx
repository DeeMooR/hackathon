import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  events: []
}

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    updateFields(state, action) {
        return {...state, ...action.payload}
    },
    clearFields() {
        return initialState;
    }
  }
})

export default eventsSlice.reducer
export const { updateFields, clearFields } = eventsSlice.actions