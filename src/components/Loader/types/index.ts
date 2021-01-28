export type LoaderProps = {
  /**
   * Дополнительный className для компонента
   */
  className?: string;
  /**
   * Текст компонента
   */
  text?: string;
  /**
   * Направление контекста
   */
  direction?: 'row' | 'column';
  /**
   * Позиция компонента
   */
  position?: 'fixed' | 'absolute';
  /**
   * Тип загрузчика
   */
  type?: 'wave' | 'basic';
  /**
   * Флаг наличия области затемнения
   */
  isDimmed?: boolean;
};
