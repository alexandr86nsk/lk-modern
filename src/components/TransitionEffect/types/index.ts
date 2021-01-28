import { ReactElement } from 'react';

export type TransitionEffectProps = {
  /**
   * Тип анимации появления и исчезновения компонента
   */
  animation?: 'fade';
  /**
   * Флаг для начала анимации для появления компонента
   */
  in?: boolean;
  /**
   * Внутренние компоненты
   */
  children?: ReactElement | ReactElement[] | string;
  /**
   * Длительность анимации появления
   */
  duration?: number;
  /**
   * Удаление компонента после выхода
   */
  unmountOnExit?: boolean;
  /**
   * Callback fired before the "entering" status is applied.
   * An extra parameter isAppearing is supplied to indicate
   * if the enter stage is occurring on the initial mount
   */
  mountOnEnter?: boolean;
  /**
   * Callback fired after the "entered" status is applied.
   * An extra parameter isAppearing is supplied to indicate
   * if the enter stage is occurring on the initial mount
   */
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  /**
   * Callback fired after the "entered" status is applied.
   * An extra parameter isAppearing is supplied to indicate
   * if the enter stage is occurring on the initial mount
   */
  onEntered?: (node: HTMLElement, isAppearing: boolean) => void;
  /**
   * Callback fired after the "exited" status is applied.
   */
  onExited?: (node: HTMLElement) => void;
};
