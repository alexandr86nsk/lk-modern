import { ReactElement } from 'react';

export type OverlayProps = {
  /**
   * Дополнительный className для компонента
   */
  className?: string;
  /**
   * Вложенные элементы
   */
  children?: ReactElement | ReactElement[] | string;
  /**
   * Флаг отображения в виде слоя только на мобильных устройствах
   */
  isOnlyInMobile?: boolean;
  /**
   * Флаг для отображения элемента
   */
  in?: boolean;
  /**
   * Длительность анимации появления
   */
  duration?: number;
};
