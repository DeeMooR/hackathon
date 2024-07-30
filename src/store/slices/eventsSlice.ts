import { createSlice } from '@reduxjs/toolkit'
import { getEventsNextAPI, getEventsPastAPI, checkAuthAPI, getEventMembersAPI } from '../requests'
import { eventsState } from '../interface';

const initialState: eventsState = {
  eventsNext: [],
  eventsPast: [],
  adminFaculty: null,
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
  reducers: {
    clearAdminFaculty(state) {
      state.adminFaculty = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEventsNextAPI.pending, setLoading)
      .addCase(getEventsNextAPI.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.eventsNext = [...payload];
      })
      .addCase(getEventsNextAPI.rejected, (state) => {
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

      .addCase(checkAuthAPI.pending, setLoading)
      .addCase(checkAuthAPI.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.adminFaculty = payload;
      })
      .addCase(checkAuthAPI.rejected, (state) => {
        state.isLoading = false;
        state.errorMessage = 'Ошибка входа в аккаунт';
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
  reducer: eventsReduces,
  actions: {
    clearAdminFaculty
  },
} = eventsSlice;