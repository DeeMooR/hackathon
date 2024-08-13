import { IEvent, IFilters, IShortEvent } from "src/interface";

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
  isErrorLoading: boolean;
}

export interface mainState {
  eventsTop: {
    eventsNextTop: IShortEvent[],
    eventsPastTop: IShortEvent[],
  },
  isLoading: boolean,
  successMessage: string | null,
  errorMessage: string | null,
  errorLoadingEventMessage: string | null,
}


export interface adminState {
  adminName: string,
  eventsNext: IShortEvent[],
  eventsPast: IShortEvent[],
  modal: {
    eventId: number | null,
    event: IEvent | null,
    action: 'create' | 'change' | 'delete' | null,
  }
  isLoading: boolean,
  successMessage: string | null,
  errorMessage: string | null,
}