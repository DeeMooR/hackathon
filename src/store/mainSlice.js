import { createSlice } from '@reduxjs/toolkit'
import { getEventsNextAPI, getEventsPastAPI, checkAuthAPI, getEventMembersAPI } from './requests.ts'

const initialState = {
  eventsNext: [],
  eventsPast: [],
  admin_name: null,
  status: null,
  error: false,
  user: null,
  members: []
}

const setLoading = (state) => {
  state.status = 'loading';
  state.error = false;
}
const setError = (state) => {
  state.status = 'rejected';
  state.error = true;
}

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    clearAdminName(state) {
      state.admin_name = null;
  },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getEventsNextAPI.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.eventsNext = [...action.payload];
    })
    .addCase(getEventsPastAPI.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.eventsPast = [...action.payload];
    })
    .addCase(checkAuthAPI.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.admin_name = action.payload;
    })
    .addCase(getEventMembersAPI.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.members = action.payload;
    })
    
    .addCase(getEventsNextAPI.pending, setLoading)
    .addCase(getEventsPastAPI.pending, setLoading)
    .addCase(checkAuthAPI.pending, setLoading)
    .addCase(getEventMembersAPI.pending, setLoading)

    .addCase(getEventsNextAPI.rejected, setError)
    .addCase(getEventsPastAPI.rejected, setError)
    .addCase(checkAuthAPI.rejected, setError)
    .addCase(getEventMembersAPI.rejected, setError)
},
})

export default mainSlice.reducer
export const { clearAdminName } = mainSlice.actions