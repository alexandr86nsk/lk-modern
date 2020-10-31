const classNameGenerator = (value) => {
  const {
    baseClass = '',
    isReadOnly,
    type,
    disabled,
  } = value || {};
  let cls = baseClass;
  if (isReadOnly) {
    cls = `${cls} ${baseClass}--read-only`;
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
  return cls;
};

export default classNameGenerator;
