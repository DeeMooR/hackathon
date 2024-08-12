import { createSlice } from '@reduxjs/toolkit'
import { getEventAction, setEventMembersAction } from '../actions';
import { eventState } from '../interface';
import { useNavigate } from 'react-router-dom';

const initialState: eventState = {
  event: null,
  isLoading: false,
  successMessage: null,
  errorMessage: null,
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
    setEventErrorMessage: (state, { payload }) => {
      state.errorMessage = payload;
    },
    clearEventErrorMessage: (state) => {
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
        state.errorMessage = 'Ошибка при загрузке мероприятия';
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
  actions: {setEventErrorMessage, clearEventErrorMessage},
} = eventSlice;