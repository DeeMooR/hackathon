import * as Yup from 'yup';
import { emailValidation } from '../validationRules';

export const emailScheme = Yup.object().shape({
  email: emailValidation,
});