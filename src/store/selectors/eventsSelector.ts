import { RootState } from "../hooks";

export const getEvents = (state: RootState) => state.events;

export const getEventsFilters = (state: RootState) => state.events.filters;