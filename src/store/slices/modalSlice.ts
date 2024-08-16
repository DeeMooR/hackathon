import { createSlice } from '@reduxjs/toolkit'
import { getEventMembersAction } from '../actions';
import { modalState } from '../interface';

const initialState: modalState = {
  eventId: null,
  action: null,
  event: null,
  teams: [],
  members: [],
  isLoading: false,
  successMessage: null,
  errorMessage: null,
}

const setLoading = (state: modalState) => {
  state.isLoading = true;
  state.successMessage = null;
  state.errorMessage = null;
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalEventId: (state, { payload }) => {
      state.eventId = payload;
    },
    setModalAction: (state, { payload }) => {
      state.action = payload;
    },
    clearModal: (state) => {
      Object.assign(state, initialState);
    },
    clearModalMessages: (state) => {
      state.successMessage = null;
      state.errorMessage = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEventMembersAction.pending, setLoading)
      .addCase(getEventMembersAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.teams = payload.filter(item => item.team !== null);
        const teamIsNull = payload.filter(item => item.team === null);
        state.members = teamIsNull.map(item => item.members[0]);
      })
      .addCase(getEventMembersAction.rejected, (state) => {
        state.isLoading = false;
        state.errorMessage = 'Ошибка загрузки участников мероприятия';
      })
  },
})

export const {
  reducer: modalReducer,
  actions: {
    setModalEventId,
    setModalAction,
    clearModal,
    clearModalMessages,
  },
} = modalSlice;