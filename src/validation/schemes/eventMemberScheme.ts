import * as Yup from 'yup';
import { teamRequiredValidation, nameRequiredValidation, surnameRequiredValidation, groupRequiredValidation } from '../validationRules';

export const eventMemberScheme = Yup.object().shape({
  team: teamRequiredValidation,
  name: nameRequiredValidation,
  surname: surnameRequiredValidation,
  groupNumber: groupRequiredValidation,
});