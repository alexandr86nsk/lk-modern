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
   * Направление компонента
   */
  position?: 'horizontal' | 'vertical';
  /**
   * Тип загрузчика
   */
  type?: 'wave';
  /**
   * Флаг наличия области затемнения
   */
  isDimmed?: boolean;
  /**
   * Флаг наличия троеточия с анимацией в конце заголовка
   */
  isDotsHidden?: boolean;
};
