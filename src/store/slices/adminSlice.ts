import { createSlice } from '@reduxjs/toolkit'
import { checkAuthAction, getAllEventsFacultyAction, getNextEventsFacultyAction, getPastEventsFacultyAction, signInAction } from '../actions';
import { adminState } from '../interface';

const initialState: adminState = {
  adminName: '',
  eventsNext: [],
  eventsPast: [],
  eventLoading: null,
  isExit: false,
  isLoading: false,
  successMessage: null,
  errorMessage: null,
}

const setEventLoading = (state: adminState, status: 'next' | 'past' | 'all') => {
  state.eventLoading = status;
  state.successMessage = null;
  state.errorMessage = null;
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
      .addCase(getAllEventsFacultyAction.pending, (state) => {
        setEventLoading(state, 'all');
      })
      .addCase(getAllEventsFacultyAction.fulfilled, (state, { payload }) => {
        state.eventLoading = null;
        state.eventsNext = payload.eventsNext;
        state.eventsPast = payload.eventsPast;
      })
      .addCase(getAllEventsFacultyAction.rejected, (state) => {
        state.eventLoading = null;
        state.errorMessage = 'Ошибка загрузки списка мероприятий';
      })

      .addCase(getNextEventsFacultyAction.pending, (state) => {
        setEventLoading(state, 'next');
      })
      .addCase(getNextEventsFacultyAction.fulfilled, (state, { payload }) => {
        state.eventLoading = null;
        state.eventsNext = payload;
      })
      .addCase(getNextEventsFacultyAction.rejected, (state) => {
        state.eventLoading = null;
        state.errorMessage = 'Ошибка загрузки ближайших мероприятий';
      })

      .addCase(getPastEventsFacultyAction.pending, (state) => {
        setEventLoading(state, 'past');
      })
      .addCase(getPastEventsFacultyAction.fulfilled, (state, { payload }) => {
        state.eventLoading = null;
        state.eventsPast = payload;
      })
      .addCase(getPastEventsFacultyAction.rejected, (state) => {
        state.eventLoading = null;
        state.errorMessage = 'Ошибка загрузки прошедших мероприятий';
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