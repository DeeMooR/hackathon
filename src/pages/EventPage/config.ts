import { IEvent } from "src/interface";

interface IEventPageData {
  crumbs: string,
  visitMessage: string,
  visitClass: string,
}

interface IEventPageNextVisit {
  message: string,
  class: string,
}

export const EventPageData: { [key: string]: (visit: string) => IEventPageData } = {
  next: (visit: string) => {
    return {
      crumbs: 'Ближайшие мероприятия',
      visitMessage: EventPageNextVisit[visit].message,
      visitClass: EventPageNextVisit[visit].class,
    };
  },
  past: () => {
      return {
      crumbs: 'Прошедшие мероприятия',
      visitMessage: 'Мероприятие завершилось',
      visitClass: 'finished',
    };
  }
};

export const EventPageNextVisit: { [visit: string]: IEventPageNextVisit } = {
  'Свободный вход': {
    message: 'Вход свободный',
    class: 'free'
  },
  'С регистрацией': {
    message: 'Регистрация обязательна',
    class: 'registration'
  },
}