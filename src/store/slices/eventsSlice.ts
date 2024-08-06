import { createSlice } from '@reduxjs/toolkit'
import { getEventMembersAPI } from '../requests'
import { getEventsNextAction, getEventsPastAction } from '../actions';
import { eventsState } from '../interface';

const initialState: eventsState = {
  page: null,
  events: [],
  activeFilter: null,
  filters: {
    faculties: [],
    types: [],
    visits: [],
  },
  isLoading: false,
  isSuccess: false,
  errorMessage: null,
}

const setLoading = (state: eventsState) => {
  state.events = [];
  state.isLoading = true;
  state.isSuccess = false;
  state.errorMessage = '';
}

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEventsPage: (state, { payload }) => {
      state.page = payload;
    },
    setEventsFaculties: (state, { payload }) => {
      const selected = state.filters.faculties;
      if (payload === 'Все факультеты') {
        state.filters.faculties = [];
        return;
      }
      if (selected.length == 6 && !selected.includes(payload)) {
        state.filters.faculties = [];
        return;
      }
      const newArr = selected.includes(payload)
        ? selected.filter((item) => item !== payload)
        : [...selected, payload];
      state.filters.faculties = newArr;
    },
    setEventsTypes: (state, { payload }) => {
      const selected = state.filters.types;
      state.filters.types = selected.includes(payload)
        ? selected.filter((item) => item !== payload)
        : [...selected, payload];
    },
    setEventsVisits: (state, { payload }) => {
      const selected = state.filters.visits;
      state.filters.visits = selected.includes(payload)
        ? selected.filter((item) => item !== payload)
        : [...selected, payload];
    },
    clearEventsFilters: (state) => {
      state.filters.types = [];
      state.filters.visits = [];
    },
    clearEventsFiltersItem: (state, { payload }) => {
      const { types, visits } = state.filters;
      state.filters.types = types.filter((item) => item !== payload);
      state.filters.visits = visits.filter((item) => item !== payload);
    },
    setEventsActiveFilter: (state, { payload }) => {
      state.activeFilter = payload;
    },
    setEventsErrorMessage: (state, { payload }) => {
      state.errorMessage = payload;
    },
    clearEventsErrorMessage: (state) => {
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEventsNextAction.pending, setLoading)
      .addCase(getEventsNextAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.events = [...payload];
      })
      .addCase(getEventsNextAction.rejected, (state) => {
        state.isLoading = false;
        state.errorMessage = 'Ошибка при получении ближайших мероприятий';
      })

      .addCase(getEventsPastAction.pending, setLoading)
      .addCase(getEventsPastAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.events = [...payload];
      })
      .addCase(getEventsPastAction.rejected, (state) => {
        state.isLoading = false;
        state.errorMessage = 'Ошибка при получении прошедших мероприятий';
      })
  },
})

export const {
  reducer: eventsReducer,
  actions: {
    setEventsPage,
    setEventsFaculties, 
    setEventsTypes, 
    setEventsVisits, 
    clearEventsFilters, 
    clearEventsFiltersItem,
    setEventsActiveFilter,
    setEventsErrorMessage,
    clearEventsErrorMessage
  },
} = eventsSlice;