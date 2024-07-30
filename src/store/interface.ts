import { IEvent } from "src/interface";

export interface eventsState {
  eventsNext: IEvent[],
  eventsPast: IEvent[],
  members: string[],
  adminFaculty: string | null,
  isLoading: boolean,
  isSuccess: boolean,
  errorMessage: string | null,
}