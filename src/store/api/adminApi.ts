import axios from "axios";
import { ISignInForm, IShortEvent } from "src/interface";
import { endpoints } from "./endpoints";

export interface SignInResponse {
  name: string,
  accessKey: string,
}

export interface CheckAuthPayload {
  accessKey: string,
}

const headers = { 'Content-Type': 'application/json' };

export const signInApi = (body: ISignInForm): Promise<SignInResponse> =>
  axios.post(endpoints.signIn, body, { headers }).then(({ data }) => data);

export const checkAuthApi = (body: CheckAuthPayload): Promise<string> =>
  axios.post(endpoints.checkAuth, body, { headers }).then(({ data }) => data);

export const getEventsNextFacultyApi = (faculty: string | null): Promise<IShortEvent[]> =>
  axios.get(endpoints.eventsNext, {params: { faculty }}).then(({ data }) => data);

export const getEventsPastFacultyApi = (faculty: string | null): Promise<IShortEvent[]> =>
  axios.get(endpoints.eventsPast, {params: { faculty }}).then(({ data }) => data);
