import { createAsyncThunk } from "@reduxjs/toolkit";
import { IShortEvent } from "src/interface";
import { getEventsNextTopApi, getEventsPastTopApi } from "../api";

interface IResponseEventsTop {
  eventsNextTop: IShortEvent[],
  eventsPastTop: IShortEvent[]
}

export const getEventsTopAction = createAsyncThunk<IResponseEventsTop, void>(
  'main/getEventsTopAction',
  async () => {
    const eventsNextTop = await getEventsNextTopApi();
    const eventsPastTop = await getEventsPastTopApi();
    return {eventsNextTop, eventsPastTop};
  }
)