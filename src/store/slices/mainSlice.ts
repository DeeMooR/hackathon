import { createSlice } from '@reduxjs/toolkit'
import { getEventsTopAction } from '../actions';
import { mainState } from '../interface';

const initialState: mainState = {
  eventsTop: {
    eventsNextTop: [],
    eventsPastTop: [],
  },
  isLoading: false,
  successMessage: null,
  errorMessage: null,
  errorLoadingEventMessage: null,
}

const setLoading = (state: mainState) => {
  state.isLoading = true;
  state.successMessage = null;
  state.errorMessage = null;
}

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setMainErrorLoadingEventMessage: (state, { payload }) => {
      state.errorLoadingEventMessage = payload;
    },
    clearMainMessages: (state) => {
      state.successMessage = null;
      state.errorMessage = null;
      state.errorLoadingEventMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEventsTopAction.pending, setLoading)
      .addCase(getEventsTopAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.eventsTop = {...payload};
      })
      .addCase(getEventsTopAction.rejected, (state) => {
        state.isLoading = false;
        state.errorMessage = 'Ошибка при получении списка мероприятий';
      })
  },
})

export const {
  reducer: mainReducer,
  actions: {setMainErrorLoadingEventMessage, clearMainMessages},
} = mainSlice;