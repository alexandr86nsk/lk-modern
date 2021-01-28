import { ReactElement, SyntheticEvent } from 'react';

import { ComponentSizes } from '@src/constants';

import { IconNames } from '@components/Icon/types';

export type ButtonProps = {
  /**
   * Тема компонента
   */
  theme?: 'negative' | 'positive' | 'primary' | 'secondary' | 'basic';
  /**
   * Текст внутри компонента
   */
  text?: string;
  /**
   * Размер компонента
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
   * Иконка внутри компонента
   */
  icon?: IconNames;
  /**
   * Позиция иконки внутри компонента
   */
  iconPosition?: 'left' | 'right';
  /**
   * Дополнительное выделение иконки внутри компонента
   */
  iconIsLabeled?: boolean;
  /**
   * Функция вызываемая при клике на компонент
   */
  onClick?: (event: SyntheticEvent) => void;
  /**
   * Флаг для установки круглой иконки
   */
  isCircular?: boolean;
  /**
   * Флаг возможности растягиваться компоненту на всю ширину контейнера
   */
  isFluid?: boolean;
  /**
   * Флаг отображения загрузки
   */
  isLoading?: boolean;
  /**
   * Флаг компактного вида у компонента
   */
  isCompact?: boolean;
  /**
   * Флаг наличия эффекта кругов при нажатии на компонент
   */
  hasRipple?: boolean;
  /**
   * Флаг установки инверсии цветов
   */
  isInverted?: boolean;
  /**
   * Флаг установки стиля компонента без background
   */
  isOutline?: boolean;
  /**
   * Флаг установки стиля компонента "ghost"
   */
  isGhost?: boolean;
  /**
   * Флаг отключения компонента
   */
  isDisabled?: boolean;
  /**
   * Внутренние компоненты
   */
  children?: string | ReactElement;
};
