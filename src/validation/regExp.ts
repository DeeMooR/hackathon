// имя или фамилия
export const NAME_OR_SURNAME_PATTERN = /^[a-zа-яё]+(?:-[a-zа-яё]+)?$/iu;

// номер группы
export const GROUP_PATTERN = /^\d{6}$/;

// не содержит: пробел, табуляция, перенос строки
export const NO_SPACE_PATTERN = /^[^\s]+$/