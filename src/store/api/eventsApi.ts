import axios from "axios";
import { IEvent } from "src/interface";
import { endpoints } from "./endpoints";

export const getEventsNext = (): Promise<IEvent[]> =>
  axios.put(endpoints.eventsNext);
