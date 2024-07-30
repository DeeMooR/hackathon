import axios from "axios";
import { IEvent } from "src/interface";
import { endpoints } from "./endpoints";

export const getEventsNext = (): Promise<IEvent[]> =>
  axios.put(endpoints.eventsNext).then(({ data }) => data);

export const getEventsPast = (): Promise<IEvent[]> =>
  axios.put(endpoints.eventsPast).then(({ data }) => data);
