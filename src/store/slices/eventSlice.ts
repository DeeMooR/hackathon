import { createSlice } from '@reduxjs/toolkit'
import { getEventAction } from '../actions';
import { eventState } from '../interface';

const initialState: eventState = {
  event: null,
  members: [],
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
  reducers: {
    setEventMembers: (state, { payload }) => {
      const { members } = state;
      if (!members.includes(payload)) state.members = [...members, payload];
      else state.errorMessage = 'Такой участник уже добавлен';
    },
    clearEventMember: (state, { payload }) => {
      state.members = state.members.filter((v) => v !== payload);;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEventAction.pending, setLoading)
      .addCase(getEventAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.event = payload;
        state.members = [];
      })
      .addCase(getEventAction.rejected, (state) => {
        state.isLoading = false;
        state.errorMessage = 'Ошибка при получении мероприятия';
      })
  },
})

export const {
  reducer: eventReducer,
  actions: {setEventMembers, clearEventMember},
} = eventSlice;