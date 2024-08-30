import * as Yup from 'yup';
import { 
  dateRequiredValidation, 
  descriptionRequiredValidation, 
  fieldRequiredValidation, 
  max25RequiredValidation, 
  resultsValidation, 
  urlRequiredValidation, 
  urlValidation 
} from '../validationRules';

export const createEventScheme = Yup.object().shape({
  photo: urlRequiredValidation,
  title: max25RequiredValidation,
  date: dateRequiredValidation,
  time: fieldRequiredValidation,
  location: max25RequiredValidation,
  description: descriptionRequiredValidation,
  archive: urlValidation,
  results: resultsValidation,
});