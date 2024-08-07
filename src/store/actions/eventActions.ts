import { createAsyncThunk } from "@reduxjs/toolkit";
import { IEvent } from "src/interface";
import { getEventApi, setEventMembersApi } from "../api";
import { RootState } from "../hooks";

export const getEventAction = createAsyncThunk<IEvent, number>(
  'event/getEventAction',
  async (id) => {
    const response = await getEventApi(id);
    return response;
  }
)

export const setEventMembersAction = createAsyncThunk<void, number, { state: RootState }>(
  'event/setEventMembersAction',
  async (id, { getState }) => {
    const body = getState().event.members;
    const response = await setEventMembersApi(id, body);
    return response;
  }
)