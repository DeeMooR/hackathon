import axios from "axios";
import { ITeam } from "src/interface";
import { endpoints } from "./endpoints";

export const getEventMembersApi = (eventId: number): Promise<ITeam[]> =>
  axios.get(endpoints.members, {params: { eventId }}).then(({ data }) => data);