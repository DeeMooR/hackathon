interface IEventsAdminData {
  title: string,
  emptyText: string,
}

export const EventsAdminData: { [type: string]: IEventsAdminData } = {
  next: {
    title: 'Ближайшие мероприятия',
    emptyText: 'Не порядок, в ближайшее время нет мероприятий'
  },
  past: {
    title: 'Прошедшие мероприятия',
    emptyText: 'За последние 90 дней мероприятий не было'
  }
};
  