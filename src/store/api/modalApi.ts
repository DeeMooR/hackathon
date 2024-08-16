import axios from "axios";
import { ICreateEvent, IEvent, ITeam } from "src/interface";
import { endpoints } from "./endpoints";

const headers = { 'Content-Type': 'application/json' };

export const getModalEventApi = (id: number): Promise<IEvent> =>
axios.get(`${endpoints.events}/${id}`).then(({ data }) => data);

export const getEventMembersApi = (eventId: number): Promise<ITeam[]> =>
  axios.get(endpoints.members, {params: { eventId }}).then(({ data }) => data);

export const createEventApi = (body: ICreateEvent): Promise<void> =>
  axios.post(endpoints.createEvent, body, { headers });

export const changeEventApi = (body: ICreateEvent, id: number | null): Promise<void> =>
  axios.put(endpoints.changeEvent, body, {headers, params: { id }});
  