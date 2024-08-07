import * as Yup from 'yup';
import { eventMemberRequiredValidation } from '../validationRules';

export const eventMemberScheme = Yup.object().shape({
  member: eventMemberRequiredValidation,
});