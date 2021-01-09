import React from 'react';
import UITextField from '../UITextField/UITextField';

const objectParser = (obj) => Object.keys(obj).map((v) => {
  if ((obj[v] && typeof obj[v] !== 'object' && !Array.isArray(obj[v])) || (!obj[v])) {
    return (
      <UITextField
        key={v}
        title={v}
        data={obj[v]}
        type="inline underline"
      />
    );
  }
  if (obj[v] && typeof obj[v] === 'object') {
    return objectParser(obj[v]);
  }
  return null;
});

export default objectParser;
