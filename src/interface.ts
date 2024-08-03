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
  visit: string,
  archive?: string,
  results?: string,
  page: 'next' | 'past',
}

export interface IAddEvent extends Omit<IEvent, 'id' | 'page'> {}

export interface IShortEvent {
  id: number,
  photo: string,
  title: string,
  date: Date,
  time: string,
  location: string,
  faculties: string[],
}

export interface IFilters {
  faculties: string[],
  types: string[],
  visits: string[],
}

export interface IAuth {
  login: string,
  password: string
}