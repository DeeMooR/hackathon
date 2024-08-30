import * as Yup from 'yup';

import {
  NAME_OR_SURNAME_PATTERN,
  GROUP_PATTERN,
  NO_SPACE_PATTERN,
  EMAIL_PATTERN,
  URL_PATTERN,
} from './regExp';

// поле (необязательное)
export const fieldValidation = Yup.string().nullable();

// поле (обязательное)
export const fieldRequiredValidation = Yup.string().required('Обязательное поле');

// строка до 25 символов (обязательное)
export const max25RequiredValidation = Yup.string()
  .required('Обязательное поле')
  .max(25, 'Максимум 25 символов');


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


// почта (необязательное)
export const emailValidation = Yup.string()
  .matches(EMAIL_PATTERN, 'Некорректная почта');


// ссылка (обязательное)
export const urlRequiredValidation = Yup.string()
  .required('Обязательное поле')
  .matches(URL_PATTERN, 'Некорректная ссылка');

// ссылка (необязательное)
export const urlValidation = Yup.string()
  .matches(URL_PATTERN, 'Некорректная ссылка')
  .nullable();

// дата (обязательное)
export const dateRequiredValidation = Yup.date()
  .required('Обязательное поле');

// описание (обязательное)
export const descriptionRequiredValidation = Yup.string()
  .required('Обязательное поле')
  .max(255, 'Максимум 255 символов');

// результаты (необязательное)
export const resultsValidation = Yup.string()
  .max(255, 'Максимум 255 символов')
  .nullable();