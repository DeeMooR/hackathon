import { createAsyncThunk } from "@reduxjs/toolkit";
import { IShortEvent } from "src/interface";
import { getEventsNextTop, getEventsPastTop } from "../api";

interface IResponseEventsTop {
  eventsNextTop: IShortEvent[],
  eventsPastTop: IShortEvent[]
}

export const getEventsTopAction = createAsyncThunk<IResponseEventsTop, void>(
  'main/getEventsTopAction',
  async () => {
    const eventsNextTop = await getEventsNextTop();
    const eventsPastTop = await getEventsPastTop();
    return {eventsNextTop, eventsPastTop};
  }
)