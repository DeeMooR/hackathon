interface IEventsTopType {
  title: string,
  navigatePage: string,
  buttonText: string,
  emptyText: string,
}

export const EventsTopType: { [type: string]: IEventsTopType } = {
  next: {
    title: 'Ближайшие мероприятия',
    navigatePage: '/next',
    buttonText: 'Смотреть будущие мероприятия',
    emptyText: 'Новые мероприятия скоро появятся!'
  },
  past: {
    title: 'Прошедшие мероприятия',
    navigatePage: '/past',
    buttonText: 'Смотреть прошлые мероприятия',
    emptyText: 'За последние 90 дней мероприятий не было'
  }
};
  