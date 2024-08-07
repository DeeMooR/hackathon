import { createAsyncThunk } from "@reduxjs/toolkit";
import { IShortEvent } from "src/interface";
import { getEventsNextApi, getEventsPastApi } from "../api";
import { RootState } from "../hooks";

export const getEventsNextAction = createAsyncThunk<IShortEvent[], void, { state: RootState }>(
  'events/getEventsNextAction',
  async (_, { getState }) => {
    const { filters } = getState().events;
    const response = await getEventsNextApi(filters);
    return response;
  }
)

export const getEventsPastAction = createAsyncThunk<IShortEvent[], void, { state: RootState }>(
  'events/getEventsPastAction',
  async (_, { getState }) => {
    const { filters } = getState().events;
    const response = await getEventsPastApi(filters);
    return response;
  }
)