import { ReactElement } from 'react';

export type DividerProps = {
  /**
   * Дополнительный className для компонента
   */
  className?: string;
  /**
   * Текст внутри компонента
   */
  text?: string;
  /**
   * Внутренние компоненты
   */
  children?: string | ReactElement;
  /**
   * Направление контекста
   */
  direction?: 'row' | 'column';
};
