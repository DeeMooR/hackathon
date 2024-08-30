import { RootState } from "../hooks";

export const getEventsSelector = (state: RootState) => state.events;

export const getEventsFiltersSelector = (state: RootState) => state.events.filters;