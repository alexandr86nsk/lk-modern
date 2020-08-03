import React from 'react';
import UIInput from '../UIInput/UIInput';
import UIReactSelect from '../UIReactSelect/UIReactSelect';
import UISemanticCheckbox from '../UISemanticCheckbox/UISemanticCheckbox';
import UITextArea from '../UITextArea/UITextArea';
import UIReactDatePicker from '../UIReactDatePicker/UIReactDatePicker';

const formGenerator = (list, dataSource = {}, callback) => list.map((v) => {
  const {
    type,
    id,
    title,
    dataKey,
    otherProps,
  } = v || {};
  const value = (dataSource[dataKey] || dataSource[dataKey] === 0)
    ? dataSource[dataKey]
    : null;
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
          data={dataSource[dataKey]}
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

export default formGenerator;
