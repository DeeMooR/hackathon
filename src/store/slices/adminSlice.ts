import { createSlice } from '@reduxjs/toolkit'
import { checkAuthAction } from '../actions';
import { adminState } from '../interface';

const initialState: adminState = {
  adminName: '',
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
    clearAdminName: (state) => {
      state.adminName = '';
    },
  },
  extraReducers: (builder) => {
    builder
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
    clearAdminName
  },
} = adminSlice;