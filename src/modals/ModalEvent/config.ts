import { ICreateEvent, ICreateEventForm, IEvent } from "src/interface";
import { changeEventAction, createEventAction } from "src/store";

interface IModalEventData {
  wordTitle: string,
  buttonText: string,
}

interface IModalEventFunc {
  body: ICreateEvent,
  page: 'next' | 'past',
  faculty: string | null,
}

interface IChangeSelectedFaculties {
  value: string,
  faculty: string | null,
  selected: string[],
  setSelected: (value: string[]) => void,

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
  create: (obj: IModalEventFunc) => createEventAction(obj),
  change: (obj: IModalEventFunc) => changeEventAction(obj)
};
  

export const transformEventToDefaultValues = (event: IEvent): ICreateEventForm => {
  const { id, page, type, visit, faculties, ...rest } = event;
  return rest;
};

export const changeSelectedFaculties = ({value, faculty, selected, setSelected}: IChangeSelectedFaculties) => {
  if (value === faculty && selected.includes(value)) return;
  if (selected.length === 1 && selected.includes(value)) return;
  if (value === 'Все факультеты') {
    setSelected(['Все факультеты']);
    return;
  }
  if (selected.length == 6 && !selected.includes(value)) {
    setSelected(['Все факультеты']);
    return;
  }
  if (selected.includes('Все факультеты') && value !== 'Все факультеты') {
    if (!faculty) setSelected([value]);
    else {
      const newArr = (faculty === value) ? [value] : [faculty, value]
      setSelected(newArr);
    }
    return;
  }
  const newSelected = selected.includes(value)
    ? selected.filter((item) => item !== value)
    : [...selected, value];
  setSelected(newSelected);
}