import * as Yup from 'yup';
import { loginRequiredValidation, passwordRequiredValidation } from '../validationRules';

export const authScheme = Yup.object().shape({
  login: loginRequiredValidation,
  password: passwordRequiredValidation,
});