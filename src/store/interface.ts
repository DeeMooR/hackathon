import { IEvent, IFilters, IMember, IShortEvent, ITeam } from "src/interface";

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
  isExit: boolean,
  isLoading: boolean,
  successMessage: string | null,
  errorMessage: string | null,
}

export interface modalState {
  eventId: number | null,
  action: 'create' | 'change' | 'delete' | 'members' | null,
  event: IEvent | null,
  teams: ITeam[],
  members: IMember[],
  isLoading: boolean,
  successMessage: string | null,
  errorMessage: string | null,
}