import { createSlice } from '@reduxjs/toolkit'
import { getEventAction, setEventMembersAction } from '../actions';
import { eventState } from '../interface';

const initialState: eventState = {
  event: null,
  isLoading: false,
  successMessage: null,
  errorMessage: null,
  isErrorLoading: false,
}

const setLoading = (state: eventState) => {
  state.isLoading = true;
  state.successMessage = null;
  state.errorMessage = null;
}

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setEventErrorLoading: (state, { payload }) => {
      state.isErrorLoading = payload;
    },
    setEventErrorMessage: (state, { payload }) => {
      state.errorMessage = payload;
    },
    clearEventMessages: (state) => {
      state.successMessage = null;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEventAction.pending, setLoading)
      .addCase(getEventAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.event = payload;
      })
      .addCase(getEventAction.rejected, (state) => {
        state.isLoading = false;
        state.isErrorLoading = true;
      })

      .addCase(setEventMembersAction.pending, setLoading)
      .addCase(setEventMembersAction.fulfilled, (state) => {
        state.isLoading = false;
        state.successMessage = 'Вы успешно зарегистрированы';
      })
      .addCase(setEventMembersAction.rejected, (state) => {
        state.isLoading = false;
        state.errorMessage = 'Ошибка при регистрации на мероприятие';
      })
  },
})

export const {
  reducer: eventReducer,
  actions: {setEventErrorLoading, setEventErrorMessage, clearEventMessages},
} = eventSlice;