import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICreateEvent, IEvent, ITeam } from "src/interface";
import { changeEventApi, createEventApi, getEventMembersApi, getModalEventApi } from "../api";
import { RootState } from "../hooks";

export const getModalEventAction = createAsyncThunk<IEvent, number>(
  'modal/getModalEventAction',
  async (id) => {
    const response = await getModalEventApi(id);
    return response;
  }
)

export const getEventMembersAction = createAsyncThunk<ITeam[], number>(
  'modal/getEventMembersAction',
  async (eventId) => {
    const response = await getEventMembersApi(eventId);
    return response;
  }
)

export const createEventAction = createAsyncThunk<void, ICreateEvent>(
  'modal/createEventAction',
  async (body) => {
    const response = await createEventApi(body);
    return response;
  }
)

export const changeEventAction = createAsyncThunk<void, ICreateEvent, { state: RootState }>(
  'modal/changeEventAction',
  async (body, { getState }) => {
    const { eventId } = getState().modal;
    const response = await changeEventApi(body, eventId);
    return response;
  }
)
