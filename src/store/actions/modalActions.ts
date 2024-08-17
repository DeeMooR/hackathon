import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICreateEvent, IEvent, ITeam } from "src/interface";
import { changeEventApi, createEventApi, deleteEventApi, getEventMembersApi, getModalEventApi } from "../api";
import { RootState } from "../hooks";
import { ActionGetEventsFaculty } from "../config";

interface IChangeEventAction {
  body: ICreateEvent,
  page: 'next' | 'past',
  faculty: string | null,
}

interface IDeleteEventAction {
  page: 'next' | 'past',
  faculty: string | null,
}

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

export const createEventAction = createAsyncThunk<void, IChangeEventAction>(
  'modal/createEventAction',
  async ({body, page, faculty}, { dispatch }) => {
    await createEventApi(body);
    const func = ActionGetEventsFaculty[page](faculty);
    dispatch(func);
  }
)

export const changeEventAction = createAsyncThunk<void, IChangeEventAction, { state: RootState }>(
  'modal/changeEventAction',
  async ({body, page, faculty}, { getState, dispatch }) => {
    const { eventId } = getState().modal;
    await changeEventApi(body, eventId);
    const func = ActionGetEventsFaculty[page](faculty);
    dispatch(func);
  }
)

export const deleteEventAction = createAsyncThunk<void, IDeleteEventAction, { state: RootState }>(
  'modal/deleteEventAction',
  async ({page, faculty}, { getState, dispatch }) => {
    const { eventId } = getState().modal;
    await deleteEventApi(eventId);
    const func = ActionGetEventsFaculty[page](faculty);
    dispatch(func);
  }
)
