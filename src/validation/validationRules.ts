import * as Yup from 'yup';

import {
  EVENT_MEMBER__PATTERN,
} from './regExp';

// имя / фамилия (обязательное)
export const eventMemberValidation = Yup.string()
  .matches(EVENT_MEMBER__PATTERN, 'Некорректная запись')
  .required('')
