import { createSlice } from '@reduxjs/toolkit'
import { setReceiverEmailAction } from '../actions';
import { emailState } from '../interface';

const initialState: emailState = {
  isLoading: false,
  successMessage: null,
  errorMessage: null,
}

const setLoading = (state: emailState) => {
  state.isLoading = true;
  state.successMessage = null;
  state.errorMessage = null;
}

const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    clearEmailMessages: (state) => {
      state.successMessage = null;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setReceiverEmailAction.pending, setLoading)
      .addCase(setReceiverEmailAction.fulfilled, (state) => {
        state.isLoading = false;
        state.successMessage = 'Вы успешно подписались на рассылку';
      })
      .addCase(setReceiverEmailAction.rejected, (state) => {
        state.isLoading = false;
        state.errorMessage = 'Ошибка при подписке на рассылку';
      })
  },
})

export const {
  reducer: emailReducer,
  actions: {clearEmailMessages},
} = emailSlice;