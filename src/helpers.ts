import { IContact, IEvent } from "./interface";

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

export const events: IEvent[] = [
  {
    id: 0,
    photo: 'https://i.ibb.co/k5HzGCR/news-6.png',
    title: 'Хакатон FCADHACK',
    date: new Date('2024-04-05'),
    time: '15:00',
    location: '2к, актовый зал',
    faculties: ['Все факультеты'],
    description: 'FCADHACK – студенческий хакатон твоего университета! Это хороший шанс показать свои умения в программировании, дизайне и других IT-сферах. На нашем хакатоне вы сможете вместе с командой создать и презентовать свой проект! <br/><br/> Все что для этого нужно — собрать команду из 3–5 человек и заполнить форму для регистрации. Нет команды? Это тоже не проблема! Также заполняй форму и мы подберём тебе сокомандников.',
    archive: 'https://www.youtube.com/watch?v=HJDL9_wO20A',
    results: '1 место: команда 1 <br/>2 место: команда 2 <br/>3 место: команда 3 <br/>4 место: команда 4 <br/>5 место: команда 5 <br/>6 место: команда 6',
    type: 'Образовательное',
    visit: 'С регистрацией'
  }
]

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

export const faculties = ['ФКП', 'ФИТУ', 'ИЭФ', 'ФКСИС', 'ФИБ', 'ФРЭ', 'ВФ'];

export const event_members = ['110901, Антонович Алексей', '210902, Матышев Дмитрий', '210902, Бабич Александр', '210902, Огиенко Надежда'];

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