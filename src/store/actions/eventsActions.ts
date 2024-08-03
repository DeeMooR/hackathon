import { createAsyncThunk } from "@reduxjs/toolkit";
import { IShortEvent } from "src/interface";
import { getEventsNext, getEventsPast } from "../api";
import { RootState } from "../hooks";

export const getEventsNextAction = createAsyncThunk<IShortEvent[], void, { state: RootState }>(
  'events/getEventsNextAction',
  async (_, { getState }) => {
    const { filters } = getState().events;
    const response = await getEventsNext(filters);
    return response;
  }
)

export const getEventsPastAction = createAsyncThunk<IShortEvent[], void, { state: RootState }>(
  'events/getEventsPastAction',
  async (_, { getState }) => {
    const { filters } = getState().events;
    const response = await getEventsPast(filters);
    return response;
  }
)