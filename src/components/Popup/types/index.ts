import { ReactElement } from 'react';

import { IconNames } from '@components/Icon/types';

export type PopupProps = {
  /**
   * Содержимое подсказки
   */
  notice?: string | ReactElement;
  /**
   * Дополнительный className
   */
  className?: string;
  /**
   * Иконка подсказки
   */
  icon?: IconNames;
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
  /**
   * Флаг отображения сообщения
   */
  in?: boolean;
  /**
   * Флаг отображения overlay в мобильной версии
   */
  isOverlayInMobile?: boolean;
};
