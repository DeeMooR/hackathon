import axios from "axios";
import { IShortEvent, IFilters } from "src/interface";
import { endpoints } from "./endpoints";

export const getEventsNext = (body: IFilters): Promise<IShortEvent[]> =>
  axios.put(endpoints.eventsNext, body).then(({ data }) => data);

export const getEventsPast = (body: IFilters): Promise<IShortEvent[]> =>
  axios.put(endpoints.eventsPast, body).then(({ data }) => data);
