import * as Yup from 'yup';

import {
  EVENT_MEMBER__PATTERN,
} from './regExp';

// участник мероприятия (обязательное)
export const eventMemberRequiredValidation = Yup.string().required('Обязательное для заполнения поле');
// .matches(EVENT_MEMBER__PATTERN, 'Некорректная запись')
