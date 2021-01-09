export type CustomError = {
  id: string;
  value: string;
};

export type IUIFormElementProps = {
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
};

export type IUIInputProps = {
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
};
