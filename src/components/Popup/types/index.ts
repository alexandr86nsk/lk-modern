import { ReactElement } from 'react';

export type PopupProps = {
  /**
   * Содержимое подсказки
   */
  notice?: string | ReactElement;
  /**
   * Иконка подсказки
   */
  icon?: ReactElement;
  /**
   * Внутренние элементы
   */
  children?: ReactElement | string;
  /**
   * Флаг заменяет событие hover на click и добавляет кнопку закрыть
   */
  isCloseable?: boolean;
  /**
   * Флаг добавляет хвостик к сообщению
   */
  hasTail?: boolean;
  /**
   * Максимальная ширина сообщения
   */
  maxWidth?: number;
};
