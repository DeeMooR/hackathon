import axios from "axios";
import { IShortEvent } from "src/interface";
import { endpoints } from "./endpoints";

export const getEventsNextTop = (): Promise<IShortEvent[]> =>
  axios.get(endpoints.eventsNextTop).then(({ data }) => data);

export const getEventsPastTop = (): Promise<IShortEvent[]> =>
  axios.get(endpoints.eventsPastTop).then(({ data }) => data);

