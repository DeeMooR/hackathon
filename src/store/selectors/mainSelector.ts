import { RootState } from "../hooks";

export const getMainSelector = (state: RootState) => state.main;

export const getMainEventsTopSelector = (state: RootState) => state.main.eventsTop;