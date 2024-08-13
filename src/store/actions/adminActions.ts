import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAuthForm, IShortEvent } from "src/interface";
import { checkAuthApi, getEventsNextFacultyApi, getEventsPastFacultyApi } from "../api";

interface IResponseEvents {
  eventsNext: IShortEvent[],
  eventsPast: IShortEvent[]
}

export const getEventsFacultyAction = createAsyncThunk<IResponseEvents, string | null>(
  'admin/getEventsFacultyAction',
  async (faculty) => {
    const eventsNext = await getEventsNextFacultyApi(faculty);
    const eventsPast = await getEventsPastFacultyApi(faculty);
    return {eventsNext, eventsPast};
  }
)

export const checkAuthAction = createAsyncThunk<string, IAuthForm>(
  'admin/checkAuthAction',
  async (obj) => {
    const response = await checkAuthApi(obj);
    return response.name;
  }
)