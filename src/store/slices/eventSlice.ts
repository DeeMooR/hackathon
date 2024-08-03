import { createSlice } from '@reduxjs/toolkit'
import { getEventAction } from '../actions';
import { eventState } from '../interface';

const initialState: eventState = {
  event: null,
  isLoading: false,
  isSuccess: false,
  errorMessage: null,
}

const setLoading = (state: eventState) => {
  state.isLoading = true;
  state.isSuccess = false;
  state.errorMessage = '';
}

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEventAction.pending, setLoading)
      .addCase(getEventAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.event = payload;
      })
      .addCase(getEventAction.rejected, (state) => {
        state.isLoading = false;
        state.errorMessage = 'Ошибка при получении мероприятия';
      })
  },
})

export const {
  reducer: eventReducer,
  actions: {},
} = eventSlice;