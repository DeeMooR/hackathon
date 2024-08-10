import axios from "axios";
import { IEvent, IMember } from "src/interface";
import { endpoints } from "./endpoints";

interface ISetEventMembersApi {
  team: string | null,
  members: IMember[]
}

export const getEventApi = (id: number): Promise<IEvent> =>
  axios.get(`${endpoints.events}/${id}`).then(({ data }) => data);

export const setEventMembersApi = (eventId: number, body: ISetEventMembersApi): Promise<void> =>
  axios.post(endpoints.setMembers, body, {params: { eventId }});
  

