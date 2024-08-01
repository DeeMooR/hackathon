import { IEvent, IFilters } from "src/interface";

export interface eventsState {
  page: 'next' | 'past' | null,
  events: IEvent[],
  members: string[],
  activeFilter: 'type' | 'visit' | null,
  filters: IFilters,
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