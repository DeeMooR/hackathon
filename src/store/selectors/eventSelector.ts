import { RootState } from "../hooks";

export const getEventSelector = (state: RootState) => state.event;

export const getEventItemSelector = (state: RootState) => state.event.event;