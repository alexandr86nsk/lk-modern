import React from 'react';
import UIInput from '../UIInput/UIInput';
import UIReactSelect from '../UIReactSelect/UIReactSelect';
import UISemanticCheckbox from '../UISemanticCheckbox/UISemanticCheckbox';
import UITextArea from '../UITextArea/UITextArea';
import UISearch from '../UISearch/UISearch';
import UIReactDatePicker from '../UIReactDatePicker/UIReactDatePicker';

const formGenerator = (list, dataSource, callback) => {
  if (list && Array.isArray(list)) {
    return list.map((v) => {
      const {
        type,
        id,
        title,
        dataKey,
        otherProps,
      } = v || {};
      const {
        [dataKey]: value,
      } = dataSource || {};
      switch (type) {
        case 'input':
          return (
            <UIInput
              key={id}
              title={title}
              name={dataKey}
              data={value}
              callback={callback}
              {...otherProps}
            />
          );
        case 'search':
          return (
            <UISearch
              key={id}
              title={title}
              name={dataKey}
              data={value}
              callback={callback}
              {...otherProps}
            />
          );
        case 'select':
          return (
            <UIReactSelect
              key={id}
              title={title}
              options={v.options}
              defaultOptions={v.defaultOptions}
              name={dataKey}
              data={value}
              callback={callback}
              {...otherProps}
            />
          );
        case 'checkbox':
          return (
            <UISemanticCheckbox
              key={id}
              title={title}
              name={dataKey}
              data={value}
              callback={callback}
              {...otherProps}
            />
          );
        case 'textarea':
          return (
            <UITextArea
              key={id}
              title={title}
              name={dataKey}
              data={value}
              callback={callback}
              vertical
              {...otherProps}
            />
          );
        case 'datePicker':
          return (
            <UIReactDatePicker
              key={id}
              title={title}
              name={dataKey}
              data={value}
              callback={callback}
              {...otherProps}
            />
          );
        default:
          return (
            <div key={id}>{value}</div>
          );
      }
    });
  }
  return null;
};

export default formGenerator;
