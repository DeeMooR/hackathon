import { allEventsTypes, allEventsVisits } from "./helpers";

export interface IContact {
  name: string,
  inst: string,
  telegram: string
}

export interface IEvent {
  id: number,
  photo: string,
  title: string,
  date: Date,
  time: string,
  location: string,
  faculties: string[],
  description: string,
  type: typeof allEventsTypes[number],
  visit: typeof allEventsVisits[number],
  archive?: string | null,
  results?: string | null,
  page: 'next' | 'past',
}

export interface ICreateEvent extends Omit<IEvent, 'id' | 'page'> {}

export interface ICreateEventForm extends Omit<IEvent, 'id' | 'page' | 'type' | 'visit' | 'faculties'> {}

export interface IShortEvent extends Omit<IEvent, 'description' | 'type' | 'archive' | 'results' | 'page'> {}

export interface IFilters {
  faculties: string[],
  types: string[],
  visits: string[],
}

export interface IMember {
  name: string,
  surname: string, 
  groupNumber: string
}

export interface IMemberForm extends IMember {
  team: string;
}

export interface ITeam {
  team: string,
  members: IMember[]
}

export interface ISignInForm {
  login: string,
  password: string
}

export interface IEmailForm {
  email?: string
}