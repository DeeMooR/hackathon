import { IContact, IEvent } from "./interface";
import { getEventsNextAction, getEventsPastAction, getNextEventsFacultyAction, getPastEventsFacultyAction } from "./store";

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

export const eventExample: IEvent =  {
  id: 0,
  photo: 'https://i.ibb.co/sWVS7z9/backet.webp',
  title: 'Хакатон FCADHACK',
  date: new Date('2024-04-05'),
  time: '15:00',
  location: '2к, актовый зал',
  faculties: ['Все факультеты'],
  description: 'FCADHACK – студенческий хакатон твоего университета! Это хороший шанс показать свои умения в программировании, дизайне и других IT-сферах. На нашем хакатоне вы сможете вместе с командой создать и презентовать свой проект! <br/><br/> Все что для этого нужно — собрать команду из 3–5 человек и заполнить форму для регистрации. Нет команды? Это тоже не проблема! Также заполняй форму и мы подберём тебе сокомандников.',
  archive: 'https://www.youtube.com/watch?v=HJDL9_wO20A',
  results: '1 место: команда 1 <br/>2 место: команда 2 <br/>3 место: команда 3 <br/>4 место: команда 4 <br/>5 место: команда 5 <br/>6 место: команда 6',
  type: 'Образовательное',
  visit: 'С регистрацией',
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

export const allFaculties = ['ФКП', 'ФИТУ', 'ИЭФ', 'ФКСИС', 'ФИБ', 'ФРЭ', 'ВФ'];
export const allEventsTypes = ['Культурные', 'Образовательные', 'Спортивные'];
export const allEventsVisits = ['Свободный вход', 'С регистрацией'];

export const membersExample = ['110901, Антонович Алексей', '210902, Матышев Дмитрий', '210902, Бабич Александр', '210902, Огиенко Надежда'];

export const modal_text = [
  {
    title: 'Вы успешно зарегистрировались',
    text: 'Предварительно мы свяжемся с вами для подтверждения регистрации',
    button: 'Вернуться на главную'
  },
  {
    title: 'Упс, что‑то пошло не так',
    text: 'Вернитесь на страницу и повторите попытку снова',
    button: 'Назад'
  }
];

export const isPast = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const event_date = new Date(date);
  event_date.setHours(0, 0, 0, 0);

  if (event_date.getTime() < today.getTime()) return true;
  return false;
}

export const ActionGetEvents = {
  next: getEventsNextAction(),
  past: getEventsPastAction(),
};

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

export const showScrollBar = () => {
  document.body.style.overflowY = 'auto';
  document.body.style.padding = '0';
}

export const hiddenScrollBar = () => {
  document.body.style.overflowY = 'hidden';
  document.body.style.padding = '0 17px 0 0';
}