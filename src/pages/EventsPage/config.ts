interface IEventsPageData {
  titleWord: string,
}

export const EventsPageData: { [page: string]: IEventsPageData } = {
  next: {
    titleWord: 'Ближайшие',
  },
  past: {
    titleWord: 'Прошедшие',
  }
};
