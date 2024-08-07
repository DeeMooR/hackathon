import axios from "axios";
import { IEvent, IMember } from "src/interface";
import { endpoints } from "./endpoints";

export const getEventApi = (id: number): Promise<IEvent> =>
  axios.get(`${endpoints.events}/${id}`).then(({ data }) => data);

export const setEventMembersApi = (id: number, body: IMember[]): Promise<void> =>
  axios.post(endpoints.setMembers, body, {params: { id }});
  

