import { ICreateEvent, ICreateEventForm, IEvent } from "src/interface";
import { changeEventAction, createEventAction } from "src/store";

interface IModalEventData {
  wordTitle: string,
  buttonText: string,
}

export const ModalEventData: { [action: string]: IModalEventData } = {
  create: {
    wordTitle: 'Добавление',
    buttonText: 'Добавить мероприятие',
  },
  change: {
    wordTitle: 'Редактирование',
    buttonText: 'Редактировать мероприятие',
  }
};

export const ModalEventFuncAction = {
  create: (body: ICreateEvent) => createEventAction(body),
  change: (body: ICreateEvent) => changeEventAction(body)
};
  

export const transformEventToDefaultValues = (event: IEvent): ICreateEventForm => {
  const { id, page, type, visit, faculties, ...rest } = event;
  return rest;
};