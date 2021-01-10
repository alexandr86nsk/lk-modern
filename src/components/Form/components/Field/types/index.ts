export type FieldProps = {
  /**
   * Флаг признака неактивного состояния у поля
   */
  isDisabled?: boolean;
  /**
   * Флаг признака только для чтения у поля
   */
  isReadOnly?: boolean;
  /**
   * Флаг признака ввода пароля у поля
   */
  isPassword?: boolean;
  /**
   * Флаг признака поиска у поля
   */
  isSearch?: boolean;
  /**
   * Флаг признака обязательности к заполнению у поля
   */
  isRequired?: boolean;
  /**
   * Флаг признака отображения ошибок у поля
   */
  isShowErrors?: boolean;
};
