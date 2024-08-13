import axios from "axios";
import { IShortEvent, IFilters } from "src/interface";
import { endpoints } from "./endpoints";

export const getEventsNextFilterApi = (body: IFilters): Promise<IShortEvent[]> =>
  axios.post(endpoints.eventsNextFilter, body).then(({ data }) => data);

export const getEventsPastFilterApi = (body: IFilters): Promise<IShortEvent[]> =>
  axios.post(endpoints.eventsNextFilter, body).then(({ data }) => data);
