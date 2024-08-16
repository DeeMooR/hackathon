import { createAsyncThunk } from "@reduxjs/toolkit";
import { ITeam } from "src/interface";
import { getEventMembersApi } from "../api";

export const getEventMembersAction = createAsyncThunk<ITeam[], number>(
  'modal/getEventMembersAction',
  async (eventId) => {
    const response = await getEventMembersApi(eventId);
    return response;
  }
)