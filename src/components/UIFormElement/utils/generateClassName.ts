import { GenerateClassNameArgs } from '../@types';

const generateClassName = (value: GenerateClassNameArgs): string => {
  const {
    baseClass = '',
    isReadOnly,
    type,
    disabled,
    errors,
    required,
    inputIsFocused,
    isEmpty,
  } = value || {};
  let cls = baseClass;
  if (isReadOnly) {
    cls = `${cls} ${baseClass}--read-only`;
  }
  if (isEmpty) {
    cls = `${cls} ${baseClass}--empty`;
  }
  if (inputIsFocused) {
    cls = `${cls} ${baseClass}--focused-input`;
  }
  if (type) {
    try {
      const typeArgs = type.split(' ');
      if (typeArgs && Array.isArray(typeArgs)) {
        typeArgs.forEach((v) => {
          cls = `${cls} ${baseClass}--${v}`;
        });
      }
    } catch (e) {
      console.log(`[${baseClass}] Error: `, e);
    }
  } else {
    cls = `${cls} ${baseClass}--basic`;
  }
  if (disabled) {
    cls = `${cls} ${baseClass}--disabled`;
  }
  if (errors) {
    cls = `${cls} ${baseClass}--error`;
  }
  if (required && !errors) {
    cls = `${cls} ${baseClass}--success`;
  }
  return cls;
};

export default generateClassName;
