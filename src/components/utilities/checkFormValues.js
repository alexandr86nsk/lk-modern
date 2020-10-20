const checkFormValues = (el, source = {}) => {
  let errors = 0;
  const {
    dataKey,
    otherProps,
  } = el || {};
  const {
    required,
    minLength,
    minInteger,
    maxInteger,
    minDate,
    maxDate,
    customValidation,
  } = otherProps || {};
  const {
    [dataKey]: value,
  } = source || {};
  if (required) {
    if (!value) {
      errors += 1;
    }
  }
  if (value || value === 0) {
    if (minLength) {
      if (value.length < minLength) {
        errors += 1;
      }
    }
    if (minInteger) {
      if (value < minInteger) {
        errors += 1;
      }
    }
    if (maxInteger) {
      if (value > maxInteger) {
        errors += 1;
      }
    }
    if (minDate) {
      try {
        const curr = new Date(value).getTime();
        const min = new Date(minDate).getTime();
        if (curr < min) {
          errors += 1;
        }
      } catch (e) {
        errors += 1;
      }
    }
    if (maxDate) {
      try {
        const curr = new Date(value).getTime();
        const max = new Date(maxDate).getTime();
        if (curr > max) {
          errors += 1;
        }
      } catch (e) {
        errors += 1;
      }
    }
    if (customValidation) {
      if (!customValidation(value)) {
        errors += 1;
      }
    }
  }

  return errors;
};

export default checkFormValues;
