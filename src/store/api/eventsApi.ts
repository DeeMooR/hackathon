import axios from "axios";
import { IEvent, IFilters } from "src/interface";
import { endpoints } from "./endpoints";

export const getEventsNext = (body: IFilters): Promise<IEvent[]> =>
  axios.put(endpoints.eventsNext, body).then(({ data }) => data);

export const getEventsPast = (body: IFilters): Promise<IEvent[]> =>
  axios.put(endpoints.eventsPast, body).then(({ data }) => data);
