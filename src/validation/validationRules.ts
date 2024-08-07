import * as Yup from 'yup';

import {
  EVENT_MEMBER__PATTERN,
} from './regExp';

// поле (необязательное)
export const fieldValidation = Yup.string();

// поле (обязательное)
export const fieldRequiredValidation = Yup.string().required('Обязательное поле');
