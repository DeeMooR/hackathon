import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAuth, IShortEvent } from "src/interface";
import { checkAuthApi, getEventsNextFacultyApi, getEventsPastFacultyApi } from "../api";
import { allFaculties } from "src/helpers";
import { RootState } from "../hooks";

interface IResponseEvents {
  eventsNext: IShortEvent[],
  eventsPast: IShortEvent[]
}

export const getEventsFacultyAction = createAsyncThunk<IResponseEvents, void, { state: RootState }>(
  'admin/getEventsFacultyAction',
  async (_, { getState }) => {
    console.log(getState());
    const { adminName } = getState().admin;
    console.log(adminName)
    const faculty = adminName; // (adminName && allFaculties.includes(adminName)) ? adminName : null;
    const eventsNext = await getEventsNextFacultyApi(faculty);
    const eventsPast = await getEventsPastFacultyApi(faculty);
    return {eventsNext, eventsPast};
  }
)

export const checkAuthAction = createAsyncThunk<string, IAuth>(
  'admin/checkAuthAction',
  async (obj) => {
    const response = await checkAuthApi(obj);
    return response.faculty;
  }
)