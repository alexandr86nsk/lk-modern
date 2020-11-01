import React from 'react';
import UIFormElement from '../UIFormElement';

const generateFormElements = (list, dataSource, callback) => {
  if (list && Array.isArray(list)) {
    return list.map((v) => {
      const {
        elementType,
        id,
        title,
        dataKey,
        otherProps,
      } = v || {};
      const {
        [dataKey]: value,
      } = dataSource || {};
      return (
        <UIFormElement
          key={id}
          title={title}
          name={dataKey}
          data={value}
          callback={callback}
          elementType={elementType}
          {...otherProps}
        />
      );
    });
  }
  return null;
};

export default generateFormElements;
