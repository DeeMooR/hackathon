import * as Yup from 'yup';
import { dateRequiredValidation, fieldRequiredValidation, fieldValidation } from '../validationRules';

export const createEventScheme = Yup.object().shape({
  photo: fieldRequiredValidation,
  title: fieldRequiredValidation,
  date: dateRequiredValidation,
  time: fieldRequiredValidation,
  location: fieldRequiredValidation,
  description: fieldRequiredValidation,
  archive: fieldValidation,
  results: fieldValidation,
});