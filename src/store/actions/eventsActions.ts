import { createAsyncThunk } from "@reduxjs/toolkit";
import { IEvent } from "src/interface";
import { getEventsNext, getEventsPast } from "../api";

export const getEventsNextAction = createAsyncThunk<IEvent[], void>(
  'events/getEventsNextAction',
  async () => {
    const response = await getEventsNext();
    return response;
  }
)

export const getEventsPastAction = createAsyncThunk<IEvent[], void>(
  'events/getEventsPastAction',
  async () => {
    const response = await getEventsPast();
    return response;
  }
)