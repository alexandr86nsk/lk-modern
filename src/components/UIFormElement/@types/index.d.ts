export type CustomError = {
  id: string;
  value: string;
};

export interface IUIFormElementProps {
  title?: string;
  data: string | number;
  name: string;
  elementType: string;
  callback: (name: string, value: string | number) => void;
  mask?: string | Array<string | RegExp>;
  minLength?: number;
  maxLength?: number;
  disabled?: boolean;
  isEmail?: boolean;
  isUrl?: boolean;
  isDate?: boolean;
  isMoney?: boolean;
  isPassword?: boolean;
  isInteger?: boolean;
  dateFormat?: string;
  required?: boolean;
  hint?: boolean;
  hintMessage?: string;
  hintIcon?: string;
  placeholder?: string;
  isReadOnly?: boolean;
  type?: string;
  isSearch?: boolean;
  maxInteger?: number;
  minInteger?: number;
  customValidation?: (value: string | number) => CustomError[];
}

export type GenerateClassNameArgs = {
  baseClass?: string;
  isReadOnly?: boolean;
  type?: string;
  disabled?: boolean;
  errors?: CustomError[] | null;
  required?: boolean;
  isFocusedInput?: boolean;
  isEmpty?: boolean;
};

export type UseRef<T> = {
  readonly current: T | null | undefined;
};

export type PopupStyle = {
  left?: string;
  right?: string;
  bottom?: string;
  top?: string;
  width?: string;
  visibility?: 'visible',
  opacity?: string,
};

export type CompareArgs = {
  minLength?: number;
  maxLength?: number;
  data: string | number;
  isEmail?: boolean;
  isUrl?: boolean;
  isInteger?: boolean;
  required?: boolean;
  maxInteger?: number;
  minInteger?: number;
  customValidation?: (value: string | number) => CustomError[];
};

export interface IUIInputProps {
  data: string | number;
  name: string;
  callback: (name: string, value: string | number) => void;
  onFocus?: () => void;
  mask?: string | Array<string|RegExp>;
  disabled?: boolean;
  isDate?: boolean;
  isMoney?: boolean;
  isPassword?: boolean;
  isInteger?: boolean;
  dateFormat?: string;
  placeholder?: string;
  passVisibility?: boolean;
}
