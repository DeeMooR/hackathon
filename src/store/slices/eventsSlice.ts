import { createSlice } from '@reduxjs/toolkit'
import { getEventsPastAPI, getEventMembersAPI } from '../requests'
import { getEventsNextAction } from '../actions';
import { eventsState } from '../interface';

const initialState: eventsState = {
  eventsNext: [],
  eventsPast: [],
  members: [],
  isLoading: false,
  isSuccess: false,
  errorMessage: null,
}

const setLoading = (state: eventsState) => {
  state.isLoading = true;
  state.isSuccess = false;
  state.errorMessage = '';
}

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEventsNextAction.pending, setLoading)
      .addCase(getEventsNextAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.eventsNext = [...payload];
      })
      .addCase(getEventsNextAction.rejected, (state) => {
        state.isLoading = false;
        state.errorMessage = 'Ошибка при получении ближайших мероприятий';
      })

      .addCase(getEventsPastAPI.pending, setLoading)
      .addCase(getEventsPastAPI.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.eventsPast = [...payload];
      })
      .addCase(getEventsPastAPI.rejected, (state) => {
        state.isLoading = false;
        state.errorMessage = 'Ошибка при получении прошедших мероприятий';
      })

      .addCase(getEventMembersAPI.pending, setLoading)
      .addCase(getEventMembersAPI.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.members = payload;
      })
      .addCase(getEventMembersAPI.rejected, (state) => {
        state.isLoading = false;
        state.errorMessage = 'Ошибка получения списка пользователей';
      })
  },
})

export const {
  reducer: eventsReducer,
  actions: {},
} = eventsSlice;