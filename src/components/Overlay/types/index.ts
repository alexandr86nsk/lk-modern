import { ReactElement } from 'react';

export type OverlayProps = {
  /**
   * Дополнительный className для компонента
   */
  className?: string;
  /**
   * Вложенные элементы
   */
  children?: ReactElement | ReactElement[];
  /**
   * Флаг отображения в виде слоя только на мобильных устройствах
   */
  isMobileOnly?: boolean;
  /**
   * Флаг для отображения элемента
   */
  in?: boolean;
  /**
   * Длительность анимации появления
   */
  duration?: number;
};
