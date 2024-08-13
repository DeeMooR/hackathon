import axios from "axios";
import { IAuthForm, IShortEvent } from "src/interface";
import { endpoints } from "./endpoints";

interface CheckAuthResponse {
  name: string,
}

const headers = { 'Content-Type': 'application/json' };

export const checkAuthApi = (obj: IAuthForm): Promise<CheckAuthResponse> =>
  axios.post(endpoints.auth, obj, { headers }).then(({ data }) => data);

export const getEventsNextFacultyApi = (faculty: string | null): Promise<IShortEvent[]> =>
  axios.get(endpoints.eventsNext, {params: { faculty }}).then(({ data }) => data);

export const getEventsPastFacultyApi = (faculty: string | null): Promise<IShortEvent[]> =>
  axios.get(endpoints.eventsPast, {params: { faculty }}).then(({ data }) => data);

