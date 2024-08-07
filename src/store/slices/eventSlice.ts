import { createSlice } from '@reduxjs/toolkit'
import { getEventAction, setEventMembersAction } from '../actions';
import { eventState } from '../interface';

const initialState: eventState = {
  event: null,
  members: [],
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
    setEventMembers: (state, { payload }) => {
      const { members } = state;
      if (!members.some((obj) => obj.member === payload.member)) state.members = [...members, payload];
      else state.errorMessage = 'Такой участник уже добавлен';
    },
    clearEventMember: (state, { payload }) => {
      state.members = state.members.filter((obj) => obj.member !== payload.member);
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
        state.members = [];
      })
      .addCase(getEventAction.rejected, (state) => {
        state.isLoading = false;
        state.errorMessage = 'Ошибка при получении мероприятия';
      })

      .addCase(setEventMembersAction.pending, setLoading)
      .addCase(setEventMembersAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.successMessage = 'Вы успешно зарегистрированы';
        state.members = [];
      })
      .addCase(setEventMembersAction.rejected, (state) => {
        state.isLoading = false;
        state.errorMessage = 'Ошибка при регистрации на мероприятие';
      })
  },
})

export const {
  reducer: eventReducer,
  actions: {setEventMembers, clearEventMember, clearEventErrorMessage},
} = eventSlice;