import { createSlice } from '@reduxjs/toolkit'
import { checkAuthAction, getEventMembersAction, getEventsFacultyAction, signInAction } from '../actions';
import { adminState } from '../interface';

const initialState: adminState = {
  adminName: '',
  eventsNext: [],
  eventsPast: [],
  modal: {
    eventId: null,
    action: null,
    event: null,
    teams: [],
    members: [],
  },
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
    setAdminModalEventId: (state, { payload }) => {
      state.modal.eventId = payload;
    },
    setAdminModalAction: (state, { payload }) => {
      state.modal.action = payload;
    },
    setAdminErrorMessage: (state, { payload }) => {
      state.errorMessage = payload;
    },
    setAdminIsExit: (state, { payload }) => {
      state.isExit = payload;
    },
    clearAdminName: (state) => {
      state.adminName = '';
    },
    clearAdminModal: (state) => {
      state.modal = {...initialState.modal};
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

      .addCase(getEventMembersAction.pending, setLoading)
      .addCase(getEventMembersAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.modal.teams = payload.filter(item => item.team !== null);
        const teamIsNull = payload.filter(item => item.team === null);
        state.modal.members = teamIsNull.map(item => item.members[0]);
      })
      .addCase(getEventMembersAction.rejected, (state) => {
        state.isLoading = false;
        state.errorMessage = 'Ошибка загрузки участников мероприятия';
      })
  },
})

export const {
  reducer: adminReducer,
  actions: {
    setAdminModalEventId,
    setAdminModalAction,
    setAdminErrorMessage,
    setAdminIsExit,
    clearAdminName,
    clearAdminModal,
    clearAdminMessages,
  },
} = adminSlice;