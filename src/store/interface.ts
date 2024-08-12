import { IEvent, IFilters, IMember, IShortEvent } from "src/interface";

export interface eventsState {
  page: 'next' | 'past' | null,
  events: IShortEvent[],
  activeFilter: 'type' | 'visit' | null,
  filters: IFilters,
  isLoading: boolean,
  successMessage: string | null,
  errorMessage: string | null,
}

export interface eventState {
  event: IEvent | null,
  isLoading: boolean,
  successMessage: string | null,
  errorMessage: string | null,
}

export interface mainState {
  eventsTop: {
    eventsNextTop: IShortEvent[],
    eventsPastTop: IShortEvent[],
  },
  isLoading: boolean,
  successMessage: string | null,
  errorMessage: string | null,
}


export interface adminState {
  adminName: string,
  isLoading: boolean,
  successMessage: string | null,
  errorMessage: string | null,
}