import * as Yup from 'yup';
import { max25RequiredValidation, nameRequiredValidation, surnameRequiredValidation, groupRequiredValidation } from '../validationRules';

export const eventMemberScheme = Yup.object().shape({
  team: max25RequiredValidation,
  name: nameRequiredValidation,
  surname: surnameRequiredValidation,
  groupNumber: groupRequiredValidation,
});