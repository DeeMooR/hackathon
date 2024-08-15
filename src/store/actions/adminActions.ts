import { createAsyncThunk } from "@reduxjs/toolkit";
import { ISignInForm, IShortEvent, ITeam } from "src/interface";
import { SignInResponse, signInApi, checkAuthApi, getEventsNextFacultyApi, getEventsPastFacultyApi, getEventMembersApi } from "../api";

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

export const signInAction = createAsyncThunk<SignInResponse, ISignInForm>(
  'admin/signInAction',
  async (obj) => {
    const response = await signInApi(obj);
    return response;
  }
)

export const checkAuthAction = createAsyncThunk<string, string>(
  'admin/checkAuthAction',
  async (accessKey) => {
    const body = { accessKey };
    const response = await checkAuthApi(body);
    return response.name;
  }
)

export const getEventMembersAction = createAsyncThunk<ITeam[], number>(
  'admin/getEventMembersAction',
  async (eventId) => {
    const response = await getEventMembersApi(eventId);
    return response;
  }
)