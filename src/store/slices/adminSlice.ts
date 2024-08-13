import { createSlice } from '@reduxjs/toolkit'
import { getEventsFacultyAction, checkAuthAction } from '../actions';
import { adminState } from '../interface';

const initialState: adminState = {
  adminName: '',
  eventsNext: [],
  eventsPast: [],
  modal: {
    eventId: null,
    event: null,
    action: null
  },
  isLoading: false,
  successMessage: null,
  errorMessage: null,
}

const setLoading = (state: adminState) => {
  state.isLoading = true;
  state.successMessage = null;
  state.errorMessage = null;
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdminModalEventId: (state, { payload }) => {
      state.modal.eventId = payload;
    },
    setAdminModalAction: (state, { payload }) => {
      state.modal.action = payload;
    },
    clearAdminModal: (state) => {
      state.modal = {...initialState.modal};
    },
    clearAdminName: (state) => {
      state.adminName = '';
    },
    clearAdminMessages: (state) => {
      state.successMessage = null;
      state.errorMessage = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEventsFacultyAction.pending, setLoading)
      .addCase(getEventsFacultyAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.eventsNext = payload.eventsNext;
        state.eventsPast = payload.eventsPast;
      })
      .addCase(getEventsFacultyAction.rejected, (state) => {
        state.isLoading = false;
        state.errorMessage = 'Ошибка при получении списка мероприятий';
      })

      .addCase(checkAuthAction.pending, setLoading)
      .addCase(checkAuthAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.adminName = payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.isLoading = false;
        state.errorMessage = 'Ошибка входа в аккаунт';
      })
  },
})

export const {
  reducer: adminReducer,
  actions: {
    setAdminModalEventId,
    setAdminModalAction,
    clearAdminModal,
    clearAdminName,
    clearAdminMessages,
  },
} = adminSlice;