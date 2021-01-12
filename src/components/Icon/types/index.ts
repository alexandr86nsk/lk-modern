import { SyntheticEvent } from 'react';

import { icons } from '../icons';

export type IconProps = {
  /**
   * Название иконки
   */
  name?: keyof typeof icons;
  /**
   * Размер иконки
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl' | 'xxxxl';
  /**
   * Сообщение которое отображается при наведении на компонент
   */
  title?: string;
  /**
   * Дополнительный className для компонента
   */
  className?: string;
  /**
   * Функция вызываемая при клике
   */
  onClick?: (event: SyntheticEvent) => void;
  /**
   * Флаг установки компактного режима
   */
  isCompact?: boolean;
  /**
   * Флаг для установки круглой иконки
   */
  isCircle?: boolean;
  /**
   * Флаг для установки волны в иконке
   */
  hasRipple?: boolean;
  /**
   * Флаг установки интерактивного режима
   */
  isInteractive?: boolean;
};
