import * as Yup from 'yup';
import { fieldRequiredValidation, nameRequiredValidation, surnameRequiredValidation, groupRequiredValidation } from '../validationRules';

export const eventMemberScheme = Yup.object().shape({
  team: fieldRequiredValidation,
  name: nameRequiredValidation,
  surname: surnameRequiredValidation,
  groupNumber: groupRequiredValidation,
});