import axios from "axios";
import { IEvent } from "src/interface";
import { endpoints } from "./endpoints";

export const getEvent = (id: number): Promise<IEvent> =>
  axios.get(`${endpoints.event}/${id}`).then(({ data }) => data);

