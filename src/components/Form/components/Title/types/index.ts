import { ReactElement } from 'react';

export type TitleProps = {
  /**
   * Текст заголовка для поля
   */
  text?: string;
  /**
   * Флаг обязательности заполнения поля
   */
  isRequired?: boolean;
  /**
   * Флаг признака только для чтения у поля
   */
  isReadOnly?: boolean;
  /**
   * Текст подсказки для поля
   */
  hintText?: string | ReactElement;
  /**
   * Иконка подсказки для поля
   */
  hintIcon?: ReactElement;
  /**
   * Флаг для установки возможности открыть закрыть подсказку по клику
   */
  hintIsCloseable?: boolean;
  /**
   * Индивидуальный компонент подсказки для поля
   */
  hintContainer?: string | ReactElement;
};
