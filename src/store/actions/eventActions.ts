import { createAsyncThunk } from "@reduxjs/toolkit";
import { IEvent } from "src/interface";
import { getEvent } from "../api";

export const getEventAction = createAsyncThunk<IEvent, number>(
  'event/getEventAction',
  async (id) => {
    const response = await getEvent(id);
    return response;
  }
)