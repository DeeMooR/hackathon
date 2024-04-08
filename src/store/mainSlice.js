import { createSlice } from '@reduxjs/toolkit'
import { getEventsNextAPI, getEventsPastAPI, checkAuthAPI } from './requests.ts'

const initialState = {
  eventsNext: [],
  eventsPast: [],
  admin_name: null,
  status: null,
  error: false
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
      state.eventsNext.push(...action.payload);
    })
    .addCase(getEventsPastAPI.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.eventsPast.push(...action.payload);
    })
    .addCase(checkAuthAPI.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.admin_name = action.payload;
    })
    
    .addCase(getEventsNextAPI.pending, setLoading)
    .addCase(getEventsPastAPI.pending, setLoading)
    .addCase(checkAuthAPI.pending, setLoading)

    .addCase(getEventsNextAPI.rejected, setError)
    .addCase(getEventsPastAPI.rejected, setError)
    .addCase(checkAuthAPI.rejected, setError)
},
})

export default mainSlice.reducer
export const { clearAdminName } = mainSlice.actions