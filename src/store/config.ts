import { getNextEventsFacultyAction, getPastEventsFacultyAction } from "./actions";

export const ActionGetEventsFaculty = {
  next: (faculty: string | null) => getNextEventsFacultyAction(faculty),
  past: (faculty: string | null) => getPastEventsFacultyAction(faculty),
};