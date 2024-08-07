import * as Yup from 'yup';
import { fieldValidation, fieldRequiredValidation } from '../validationRules';

export const eventMemberScheme = Yup.object().shape({
  team: fieldRequiredValidation,
  name: fieldRequiredValidation,
  surname: fieldRequiredValidation,
  group: fieldRequiredValidation,
});