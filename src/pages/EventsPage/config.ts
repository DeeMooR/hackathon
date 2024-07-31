import { IEvent } from "src/interface";
import { getEventsNextAction, getEventsPastAction } from "src/store";

interface IEventsPageData {
  titleWord: string,
  actionGetEvents: any,
}

interface IEventsPageAllEvents {
  [type: string]: (state: {[key: string]: IEvent[]}) => IEvent[],
}

export const EventsPageData: { [type: string]: IEventsPageData } = {
  next: {
    titleWord: 'Ближайшие',
    actionGetEvents: getEventsNextAction(),
  },
  past: {
    titleWord: 'Прошедшие',
    actionGetEvents: getEventsPastAction(),
  }
};

export const EventsPageAllEvents: IEventsPageAllEvents = {
  next: ({ eventsNext }) => eventsNext,
  past: ({ eventsPast }) => eventsPast,
};