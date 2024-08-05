import * as Yup from 'yup';
import { eventMemberValidation } from '../validationRules';

export const eventMemberScheme = Yup.object().shape({
  member: eventMemberValidation,
});