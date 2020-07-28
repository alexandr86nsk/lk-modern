function selectedFiltersCounter(value) {
  let counter = 0;
  value.forEach((v) => {
    if (Array.isArray(v)) {
      counter += v.length;
    } else if (v || v === 0) {
      counter += 1;
    }
  });
  return counter;
}

export default selectedFiltersCounter;
