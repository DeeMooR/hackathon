import { createSlice } from '@reduxjs/toolkit'
import { checkAuthAction } from '../actions';
import { adminState } from '../interface';

const initialState: adminState = {
  adminFaculty: '',
  isLoading: false,
  isSuccess: false,
  errorMessage: null,
}

const setLoading = (state: adminState) => {
  state.isLoading = true;
  state.isSuccess = false;
  state.errorMessage = '';
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearAdminFaculty(state) {
      state.adminFaculty = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthAction.pending, setLoading)
      .addCase(checkAuthAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.adminFaculty = payload;
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
    clearAdminFaculty
  },
} = adminSlice;