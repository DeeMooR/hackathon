import { allEventsTypes, allEventsVisits } from "src/helpers";
import { setEventsTypes, setEventsVisits } from "src/store";

interface IFilterItemData {
  title: string,
  options: string[],
}

export const FilterItemData: { [type: string]: IFilterItemData } = {
  type: {
    title: 'Вид мероприятия',
    options: allEventsTypes,
  },
  visit: {
    title: 'Тип посещения',
    options: allEventsVisits,
  }
};

export const FilterItemFuncUpdate = {
  type: (value: string) => setEventsTypes(value),
  visit: (value: string) => setEventsVisits(value)
};
  