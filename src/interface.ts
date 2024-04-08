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
  archive: string,
  results: string,
  type: string,
  visit: string
}

export interface IAddEvent {
  photo: string,
  title: string,
  date: Date,
  time: string,
  location: string,
  faculties: string[],
  description: string,
  type: string,
  visit: string
}

export interface IAuth {
  login: string,
  password: string
}