import axios from "axios";
import { IShortEvent, IFilters } from "src/interface";
import { endpoints } from "./endpoints";

export const getEventsNext = (body: IFilters): Promise<IShortEvent[]> =>
  axios.post(endpoints.eventsNext, body).then(({ data }) => data);

export const getEventsPast = (body: IFilters): Promise<IShortEvent[]> =>
  axios.post(endpoints.eventsPast, body).then(({ data }) => data);
