import { createAsyncThunk } from "@reduxjs/toolkit";
import { IEvent } from "src/interface";
import { SetEventMembersPayload, getEventApi, setEventMembersApi } from "../api";

interface ISetEventMembersAction {
  eventId: number,
  body: SetEventMembersPayload,
}

export const getEventAction = createAsyncThunk<IEvent, number>(
  'event/getEventAction',
  async (id) => {
    const response = await getEventApi(id);
    return response;
  }
)

export const setEventMembersAction = createAsyncThunk<void, ISetEventMembersAction>(
  'event/setEventMembersAction',
  async ({eventId, body}) => {
    const response = await setEventMembersApi(eventId, body);
    return response;
  }
)