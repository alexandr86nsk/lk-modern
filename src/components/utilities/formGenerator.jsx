import React from 'react';
import UIInput from '../UIInputV2/UIInput';
import UIReactSelect from '../UIReactSelect/UIReactSelect';
import UICheckBox from '../UICheckbox/UICheckbox';
import UITextArea from '../UITextArea/UITextArea';
import UIReactDatePicker from '../UIReactDatePicker/UIReactDatePicker';
import UITextField from '../UITextField/UITextField';

const formGenerator = (list, dataSource, callback) => {
  if (dataSource) {
    return list.map((v) => {
      const {
        type,
        id,
        title,
        dataKey,
      } = v || {};
      switch (type) {
        case 'input':
          return (
            <UIInput
              key={id}
              title={title}
              name={dataKey}
              data={(dataSource[dataKey] || dataSource[dataKey] === 0) ? dataSource[dataKey] : ''}
              callback={callback}
              {...v.otherProps}
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
              data={(dataSource[dataKey] === 0 || dataSource[dataKey]) ? dataSource[dataKey] : ''}
              callback={callback}
              {...v.otherProps}
            />
          );
        case 'checkbox':
          return (
            <UICheckBox
              key={id}
              title={title}
              name={dataKey}
              data={dataSource[dataKey] || ''}
              callback={callback}
            />
          );
        case 'textarea':
          return (
            <UITextArea
              key={id}
              title={title}
              name={dataKey}
              data={(dataSource[dataKey] === 0 || dataSource[dataKey]) ? dataSource[dataKey] : ''}
              callback={callback}
              vertical
            />
          );
        case 'datePicker':
          return (
            <UIReactDatePicker
              key={id}
              title={title}
              name={dataKey}
              data={dataSource[dataKey] || ''}
              callback={callback}
              {...v.otherProps}
            />
          );
        case 'textField':
          return (
            <UITextField
              key={id}
              title={title}
              name={dataKey}
              data={!v.subData ? (dataSource[dataKey] || '') : (dataSource[dataKey][v.subData] || '')}
              {...v.otherProps}
            />
          );
        default:
          return (
            <div key={id}>{dataSource[dataKey] || ''}</div>
          );
      }
    });
  }
  return null;
};

export default formGenerator;
