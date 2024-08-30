import { IContact, IEvent } from "./interface";
import { getEventsNextAction, getEventsPastAction } from "./store";

export const allFaculties = ['ФКП', 'ФИТУ', 'ИЭФ', 'ФКСИС', 'ФИБ', 'ФРЭ', 'ВФ'];
export const allEventsTypes = ['Культурные', 'Образовательные', 'Спортивные'];
export const allEventsVisits = ['Свободный вход', 'С регистрацией'];

export const contacts: IContact[] = [
  {
    name: 'ФКП',
    inst: 'https://www.youtube.com/watch?v=4xDzrJKXOOY',
    telegram: '...'
  },
  {
    name: 'ФКСИС',
    inst: '...',
    telegram: '...'
  },
  {
    name: 'ФИТУ',
    inst: '...',
    telegram: '...'
  },
  {
    name: 'ФИБ',
    inst: '...',
    telegram: '...'
  },
  {
    name: 'ИЭФ',
    inst: '...',
    telegram: '...'
  },
  {
    name: 'ФРЭ',
    inst: '...',
    telegram: '...'
  },
  {
    name: 'ВФ',
    inst: '...',
    telegram: '...'
  }
]

// заглушка для ts. Данные из объекта не будет использоваться
export const eventPlug: IEvent =  {
  id: 0,
  photo: '',
  title: '',
  date: new Date(),
  time: '',
  location: '',
  faculties: [],
  description: '',
  archive: '',
  results: '',
  type: allEventsTypes[0],
  visit: allEventsVisits[0],
  page: 'next'
}

export const formatDate = (dateString: Date) => {
  const months = [
    "января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"
  ];
  const date = new Date(dateString);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  return `${day} ${months[monthIndex]} ${year}`;
}

export const ActionGetEvents = {
  next: getEventsNextAction(),
  past: getEventsPastAction(),
};

export const showScrollBar = () => {
  document.body.style.overflowY = 'auto';
  document.body.style.padding = '0';
}

export const hiddenScrollBar = () => {
  document.body.style.overflowY = 'hidden';
  document.body.style.padding = '0 17px 0 0';
}