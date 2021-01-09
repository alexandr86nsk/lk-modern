const stringFromData = (array) => {
  let str = '';
  if (array && Array.isArray(array)) {
    array.forEach((v) => {
      if (v || v === 0) {
        str = `${str} ${v}`;
      }
    });
  }
  return str;
};

export default stringFromData;
