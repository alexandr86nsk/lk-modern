import React from 'react';
import UIInput from '../UIInputV2/UIInput';
import UIReactSelect from '../UIReactSelect/UIReactSelect';
import UICheckBox from '../UICheckbox/UICheckbox';
import UITextArea from '../UITextArea/UITextArea';
import UIReactDatePicker from '../UIReactDatePicker/UIReactDatePicker';
import UITextField from '../UITextField/UITextField';

const formGenerator = (list, dataSource, callback) => (
  list.map((v) => {
    let filteredOption = '';
    switch (v.type) {
      case 'input':
        return (
          <UIInput
            key={v.id}
            title={v.title}
            name={v.data}
            data={(dataSource[v.data] === 0 || dataSource[v.data]) ? dataSource[v.data] : ''}
            callback={callback}
            {...v.validation}
          />
        );
      case 'input-options':
        return (
          <UIInput
            key={v.id}
            title={v.title}
            name={v.data}
            data={v.options[dataSource[v.data]] || ''}
            callback={callback}
            {...v.validation}
          />
        );
      case 'input-select-options':
        // eslint-disable-next-line max-len
        filteredOption = Array.isArray(v.options) ? v.options.filter((x) => x.value === dataSource[v.data])[0] : {};
        if (filteredOption) {
          return (
            <UIInput
              key={v.id}
              title={v.title}
              name={v.data}
              data={filteredOption.label || ''}
              callback={callback}
              {...v.validation}
            />
          );
        }
        return null;
      case 'input-isEmpty':
        return (
          <UIInput
            key={v.id}
            title={v.title}
            name={v.data}
            data={dataSource[v.data] || v.isEmpty}
            callback={callback}
            {...v.validation}
          />
        );
      case 'input-boolean':
        return (
          <UIInput
            key={v.id}
            title={v.title}
            name={v.data}
            data={dataSource[v.data] ? v.trueMessage : v.falseMessage}
            callback={callback}
            {...v.validation}
          />
        );
      case 'select':
        return (
          <UIReactSelect
            key={v.id}
            title={v.title}
            options={v.options}
            defaultOptions={v.defaultOptions}
            name={v.data}
            data={(dataSource[v.data] === 0 || dataSource[v.data]) ? dataSource[v.data] : ''}
            callback={callback}
            {...v.validation}
          />
        );
      case 'checkbox':
        return (
          <UICheckBox
            key={v.id}
            title={v.title}
            name={v.data}
            data={dataSource[v.data] || ''}
            callback={callback}
          />
        );
      case 'textarea':
        return (
          <UITextArea
            key={v.id}
            title={v.title}
            name={v.data}
            data={(dataSource[v.data] === 0 || dataSource[v.data]) ? dataSource[v.data] : ''}
            callback={callback}
            vertical
          />
        );
      case 'datePicker':
        return (
          <UIReactDatePicker
            key={v.id}
            title={v.title}
            name={v.data}
            data={dataSource[v.data] || ''}
            callback={callback}
            {...v.validation}
          />
        );
      case 'textField':
        return (
          <UITextField
            key={v.id}
            title={v.title}
            name={v.data}
            data={!v.subData ? (dataSource[v.data] || '') : (dataSource[v.data][v.subData] || '')}
            {...v.validation}
          />
        );
      case 'textField-options':
        return (
          <UITextField
            key={v.id}
            title={v.title}
            name={v.data}
            data={v.options[dataSource[v.data]] || ''}
            {...v.validation}
          />
        );
      case 'textField-select-options':
        // eslint-disable-next-line max-len
        filteredOption = Array.isArray(v.options) ? v.options.filter((x) => x.value === dataSource[v.data])[0] : {};
        if (filteredOption) {
          return (
            <UITextField
              key={v.id}
              title={v.title}
              name={v.data}
              data={filteredOption.label || ''}
              {...v.validation}
            />
          );
        }
        return null;
      default:
        return (
          <div key={v.id}>{dataSource[v.data] || ''}</div>
        );
    }
  })
);

export default formGenerator;
