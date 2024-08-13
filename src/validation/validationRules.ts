import * as Yup from 'yup';

import {
  NAME_OR_SURNAME_PATTERN,
  GROUP_PATTERN,
  NO_SPACE_PATTERN,
} from './regExp';

// поле (необязательное)
export const fieldValidation = Yup.string();

// поле (обязательное)
export const fieldRequiredValidation = Yup.string().required('Обязательное поле');

// имя (обязательное)
export const nameRequiredValidation = Yup.string()
  .required('Обязательное поле')
  .matches(NAME_OR_SURNAME_PATTERN, 'Некорректное имя');

// фамилия (обязательное)
export const surnameRequiredValidation = Yup.string()
  .required('Обязательное поле')
  .matches(NAME_OR_SURNAME_PATTERN, 'Некорректная фамилия');

// номер группы (обязательное)
export const groupRequiredValidation = Yup.string()
  .required('Обязательное поле')
  .matches(GROUP_PATTERN, 'Некорректная запись');

// логин (обязательное)
export const loginRequiredValidation = Yup.string()
  .required('Обязательное поле')
  .matches(NO_SPACE_PATTERN, 'Некорректный логин');

// пароль (обязательное)
export const passwordRequiredValidation = Yup.string()
  .required('Обязательное поле')
  .matches(NO_SPACE_PATTERN, 'Некорректный пароль');