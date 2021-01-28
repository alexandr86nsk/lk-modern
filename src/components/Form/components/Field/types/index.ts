import { SyntheticEvent } from 'react';

import { CallbackFunctionType } from '@src/types';

import { CustomError } from '@components/Form/types';
import { IconNames } from '@components/Icon/types';

export type FieldOnChangeValueType = {
  name?: string;
  value?: string | number | null;
};

export type FieldProps = {
  /**
   * Дополнительный класс для компонента
   */
  className?: string;
  /**
   * Заголовок поля
   */
  title?: string;
  /**
   * Поле для идентификации на форме
   */
  name?: string;
  /**
   * Тема оформления компонента
   */
  theme?: 'basic' | 'filled';
  /**
   * Значение поля ввода
   */
  value?: string | number | null;
  /**
   * Иконка для компонента
   */
  icon?: IconNames;
  /**
   * Флаг признака неактивного состояния у поля
   */
  isDisabled?: boolean;
  /**
   * Флаг признака только для чтения у поля
   */
  isReadOnly?: boolean;
  /**
   * Флаг признака обязательности к заполнению у поля
   */
  isRequired?: boolean;
  /**
   * Флаг признака отображения ошибок у поля
   */
  isShowErrors?: boolean;
  /**
   * Обработчик изменения поля вводу
   */
  onChange?: (value: FieldOnChangeValueType, event: SyntheticEvent) => void;
  /**
   * Тип поля
   */
  type?:
    | 'password' // Для ввода пароля
    | 'email' // Для адресов электронной почты
    | 'number' // Ввод чисел
    | 'search' // Поле для поиска
    | 'tel' //	Для телефонных номеров
    | 'url' // Для веб-адресов
    | 'text' // Текстовое поле
    | 'date' // Поле для выбора календарной даты
    | 'datetime' // Указание даты и времени
    | 'datetime-local' // Указание местной даты и времени
    | 'time' // Для времени
    | 'month' // Выбор месяца
    | 'week'; // Выбор недели
  /**
   * Флаг наличия автоматической вставки данных данных
   */
  isAutoComplete?: boolean;
};

export type FieldInfoProps = Exclude<FieldProps, 'icon'> & {
  /**
   * Действие при нажатии на кнопку очистить
   */
  onClearClick?: CallbackFunctionType;
  /**
   * Действие при нажатии на кнопку смены видимости пароля
   */
  onChangePassVisibilityClick?: CallbackFunctionType;
  /**
   * Флаг для смены иконки видимости пароля
   */
  passVisibility?: boolean;
  /**
   * Массив ошибок у поля
   */
  errors?: CustomError[];
};
