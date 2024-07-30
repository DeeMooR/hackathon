import { IEvent } from "src/interface";

export interface eventsState {
  eventsNext: IEvent[],
  eventsPast: IEvent[],
  members: string[],
  isLoading: boolean,
  isSuccess: boolean,
  errorMessage: string | null,
}

export interface adminState {
  adminFaculty: string,
  isLoading: boolean,
  isSuccess: boolean,
  errorMessage: string | null,
}