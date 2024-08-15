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
  type: string,
  visit: 'Свободный вход' | 'С регистрацией',
  archive?: string,
  results?: string,
  page: 'next' | 'past',
}

export interface IAddEvent extends Omit<IEvent, 'id' | 'page'> {}

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

export interface ISignInForm {
  login: string,
  password: string
}