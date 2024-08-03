import { IEvent, IFilters, IShortEvent } from "src/interface";

export interface eventsState {
  page: 'next' | 'past' | null,
  events: IShortEvent[],
  activeFilter: 'type' | 'visit' | null,
  filters: IFilters,
  isLoading: boolean,
  isSuccess: boolean,
  errorMessage: string | null,
}

export interface eventState {
  event: IEvent | null,
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