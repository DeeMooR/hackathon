import { createAsyncThunk } from "@reduxjs/toolkit";
import { IEvent } from "src/interface";
import { getEventsNext } from "../api";

export const getEventsNextAction = createAsyncThunk<IEvent[], void>(
  'events/getEventsNextAction',
  async () => {
    const response = await getEventsNext();
    return response;
  }
)