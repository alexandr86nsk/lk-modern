import React from 'react';
import './UIReactDatePicker.scss';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';
import InputMask from 'react-input-mask';
import ErrorIcon from './error-icon.svg';
import SuccessIcon from './check-icon.svg';

registerLocale('ru', ru);

function UIReactDatePicker(props) {
  const {
    title,
    label,
    name,
    data = '',
    type,
    callback,
    showTimeSelect,
    showTimeSelectOnly,
    required,
    hint,
    endOfDay,
    disabled,
    placeholderText = 'Выберите дату',
    isClearable = true,
    ...moreProps
  } = props;

  const [focus, setFocus] = React.useState(false);

  const handleFocus = React.useCallback(() => {
    setFocus(true);
  }, []);

  const handleBlur = React.useCallback(() => {
    setFocus(false);
  }, []);

  const handleChange = React.useCallback((date) => {
    if (callback) {
      if (date) {
        callback(name, endOfDay ? new Date(date.setHours(23, 59, 59, 999)) : date);
      } else {
        callback(name, date);
      }
    }
  }, [callback, endOfDay, name]);

  const className = React.useMemo(() => {
    let str = 'ui-react-datepicker';
    if (type) {
      str = `${str} ${type}`;
    }
    if (data) {
      str = `${str} data`;
    } else {
      str = `${str} empty`;
    }
    if (focus) {
      str = `${str} focus`;
    }
    if (required) {
      str = `${str} required`;
      if (!data) {
        str = `${str} error`;
      } else {
        str = `${str} success`;
      }
    }
    return str;
  }, [data, focus, required, type]);

  return (
    <div className={className}>
      {title
      && (
        <div className="ui-react-datepicker__title" title={title}>
          <span className="ellipsis-element">{title}</span>
          {required && <div className="required-icon">*</div>}
          {hint && hint}
        </div>
      )}
      <div className="ui-react-datepicker__body">
        <DatePicker
          {...moreProps}
          selected={data ? new Date(data) : ''}
          onChange={handleChange}
          locale="ru"
          disabled={disabled}
          placeholderText={placeholderText}
          dateFormat="dd.MM.yyyy HH:mm:ss"
          showYearDropdown
          showTimeSelect={showTimeSelect}
          showTimeSelectOnly={showTimeSelectOnly}
          yearDropdownItemNumber={15}
          scrollableYearDropdown
          showMonthDropdown
          excludeTimes
          onFocus={handleFocus}
          onBlur={handleBlur}
          isClearable={isClearable}
          customInput={(
            <InputMask
              className="ui-react-datepicker__input"
              alwaysShowMask
              mask={showTimeSelect ? '00.00.0000 00:00:00' : '00.00.0000'}
              maskChar={null}
              formatChars={{
                0: '[0-9]',
                a: '[A-Za-z]',
                '*': '[A-Za-z0-9]',
              }}
            />
        )}
        />
        {label
        && (
          <div className="ui-react-datepicker__label">
            <span className="ellipsis-element">{label}</span>
            {required && <div className="required-icon">*</div>}
          </div>
        )}
        <div className="ui-react-datepicker__error" title="Ошибка">
          <ErrorIcon />
        </div>
        <div className="ui-react-datepicker__success" title="Верно">
          <SuccessIcon />
        </div>
      </div>
    </div>
  );
}

export default React.memo(UIReactDatePicker);
