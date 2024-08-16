import { createSlice } from '@reduxjs/toolkit'
import { checkAuthAction, getEventsFacultyAction, signInAction } from '../actions';
import { adminState } from '../interface';

const initialState: adminState = {
  adminName: '',
  eventsNext: [],
  eventsPast: [],
  isExit: false,
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
    setAdminIsExit: (state, { payload }) => {
      state.isExit = payload;
    },
    setAdminErrorMessage: (state, { payload }) => {
      state.errorMessage = payload;
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

      .addCase(signInAction.pending, setLoading)
      .addCase(signInAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.adminName = payload.name;
        localStorage.setItem('accessKey', payload.accessKey);
      })
      .addCase(signInAction.rejected, (state) => {
        state.isLoading = false;
        state.errorMessage = 'Ошибка входа в аккаунт';
      })

      .addCase(checkAuthAction.pending, setLoading)
      .addCase(checkAuthAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.adminName = payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.isLoading = false;
        state.adminName = '';
        localStorage.removeItem('accessKey');
        state.isExit = true;
        state.errorMessage = 'Произошла ошибка. Выход из аккаунта';
      })
  },
})

export const {
  reducer: adminReducer,
  actions: {
    setAdminIsExit,
    setAdminErrorMessage,
    clearAdminName,
    clearAdminMessages,
  },
} = adminSlice;