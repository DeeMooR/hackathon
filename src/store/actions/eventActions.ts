import { createAsyncThunk } from "@reduxjs/toolkit";
import { IEvent } from "src/interface";
import { SetEventMembersPayload, getEventApi, setEventMembersApi } from "../api";

interface ISetEventMembersAction {
  id: string,
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
  async ({id, body}) => {
    const response = await setEventMembersApi(+id, body);
    return response;
  }
)