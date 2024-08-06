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
  members: string[],
  isLoading: boolean,
  isSuccess: boolean,
  errorMessage: string | null,
}

export interface mainState {
  eventsTop: {
    eventsNextTop: IShortEvent[],
    eventsPastTop: IShortEvent[],
  },
  isLoading: boolean,
  isSuccess: boolean,
  errorMessage: string | null,
}


export interface adminState {
  adminName: string,
  isLoading: boolean,
  isSuccess: boolean,
  errorMessage: string | null,
}