import { createSlice } from '@reduxjs/toolkit'
import { changeEventAction, createEventAction, getEventMembersAction, getModalEventAction } from '../actions';
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
    setModalErrorMessage: (state, { payload }) => {
      state.errorMessage = payload;
    },
    clearModalMessages: (state) => {
      state.successMessage = null;
      state.errorMessage = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getModalEventAction.pending, setLoading)
      .addCase(getModalEventAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.event = payload;
      })
      .addCase(getModalEventAction.rejected, (state) => {
        state.isLoading = false;
        const errorMessage = 'Ошибка при загрузке мероприятия';
        Object.assign(state, {...initialState, errorMessage});
      })

      .addCase(getEventMembersAction.pending, setLoading)
      .addCase(getEventMembersAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.teams = payload.filter(item => item.team !== null);
        const teamIsNull = payload.filter(item => item.team === null);
        state.members = teamIsNull.map(item => item.members[0]);
      })
      .addCase(getEventMembersAction.rejected, (state) => {
        state.isLoading = false;
        const errorMessage = 'Ошибка загрузки участников мероприятия';
        Object.assign(state, {...initialState, errorMessage});
      })

      .addCase(createEventAction.pending, setLoading)
      .addCase(createEventAction.fulfilled, (state) => {
        state.isLoading = false;
        const successMessage = 'Мероприятие успешно создано';
        Object.assign(state, {...initialState, successMessage});
      })
      .addCase(createEventAction.rejected, (state) => {
        state.isLoading = false;
        state.errorMessage = 'Ошибка при создании мероприятия';
      })

      .addCase(changeEventAction.pending, setLoading)
      .addCase(changeEventAction.fulfilled, (state) => {
        state.isLoading = false;
        const successMessage = 'Мероприятие успешно обновлено';
        Object.assign(state, {...initialState, successMessage});
      })
      .addCase(changeEventAction.rejected, (state) => {
        state.isLoading = false;
        state.errorMessage = 'Ошибка при обновлении мероприятия';
      })
  },
})

export const {
  reducer: modalReducer,
  actions: {
    setModalEventId,
    setModalAction,
    clearModal,
    setModalErrorMessage,
    clearModalMessages,
  },
} = modalSlice;