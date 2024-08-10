import { createAsyncThunk } from "@reduxjs/toolkit";
import { IEvent } from "src/interface";
import { getEventApi, setEventMembersApi } from "../api";
import { RootState } from "../hooks";

interface ISetEventMembersAction {
  id: string,
  team: string | null,
}

export const getEventAction = createAsyncThunk<IEvent, number>(
  'event/getEventAction',
  async (id) => {
    const response = await getEventApi(id);
    return response;
  }
)

export const setEventMembersAction = createAsyncThunk<void, ISetEventMembersAction, { state: RootState }>(
  'event/setEventMembersAction',
  async ({id, team}, { getState }) => {
    const {members} = getState().event;
    const body = { team, members }
    const response = await setEventMembersApi(+id, body);
    return response;
  }
)