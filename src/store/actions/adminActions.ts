import { createAsyncThunk } from "@reduxjs/toolkit";
import { ISignInForm, IShortEvent } from "src/interface";
import { SignInResponse, signInApi, checkAuthApi, getEventsNextFacultyApi, getEventsPastFacultyApi } from "../api";

interface IResponseEvents {
  eventsNext: IShortEvent[],
  eventsPast: IShortEvent[]
}

export const getAllEventsFacultyAction = createAsyncThunk<IResponseEvents, string | null>(
  'admin/getAllEventsFacultyAction',
  async (faculty) => {
    const eventsNext = await getEventsNextFacultyApi(faculty);
    const eventsPast = await getEventsPastFacultyApi(faculty);
    return {eventsNext, eventsPast};
  }
)

export const getNextEventsFacultyAction = createAsyncThunk<IShortEvent[], string | null>(
  'admin/getNextEventsFacultyAction',
  async (faculty) => {
    const response = await getEventsNextFacultyApi(faculty);
    return response;
  }
)

export const getPastEventsFacultyAction = createAsyncThunk<IShortEvent[], string | null>(
  'admin/getPastEventsFacultyAction',
  async (faculty) => {
    const response = await getEventsPastFacultyApi(faculty);
    return response;
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
    return response;
  }
)