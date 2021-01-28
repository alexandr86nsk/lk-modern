import { ComponentSizes } from '@src/constants';

import { icons } from '../icons';

export type IconNames = keyof typeof icons;

export type IconProps = {
  /**
   * Название иконки
   */
  name: IconNames;
  /**
   * Размер иконки
   */
  size?: ComponentSizes;
  /**
   * Сообщение которое отображается при наведении на компонент
   */
  title?: string;
  /**
   * Дополнительный className для компонента
   */
  className?: string;
  /**
   * Флаг круглой иконки
   */
  isCircular?: boolean;
};
