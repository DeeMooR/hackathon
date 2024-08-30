import axios from "axios";
import { IShortEvent } from "src/interface";
import { endpoints } from "./endpoints";

export const getEventsNextTopApi = (): Promise<IShortEvent[]> =>
  axios.get(endpoints.eventsNextTop).then(({ data }) => data);

export const getEventsPastTopApi = (): Promise<IShortEvent[]> =>
  axios.get(endpoints.eventsPastTop).then(({ data }) => data);

