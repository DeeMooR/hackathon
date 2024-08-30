// имя или фамилия
export const NAME_OR_SURNAME_PATTERN = /^[a-zа-яё]+(?:-[a-zа-яё]+)?$/iu;

// почта
export const EMAIL_PATTERN = /^$|^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

// номер группы
export const GROUP_PATTERN = /^\d{6}$/;

// не содержит: пробел, табуляция, перенос строки
export const NO_SPACE_PATTERN = /^[^\s]+$/
