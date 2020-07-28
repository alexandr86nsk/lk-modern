import React from 'react';
import './UIReactDatePicker.scss';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';
import InputMask from 'react-input-mask';
import ErrorIcon from '../../static/images/error-24px.svg';
import SuccessIcon from '../../static/images/check_circle-24px.svg';

registerLocale('ru', ru);

function UIReactDatePicker(props) {
  const {
    title,
    name,
    data = '',
    callback,
    showTimeSelect,
    showTimeSelectOnly,
    required,
    hint,
    placeholderText = 'Выберите дату',
    ...moreProps
  } = props;

  const handleChange = React.useCallback((date) => {
    if (callback) {
      callback(name, date);
    }
  }, [callback, name]);

  const className = React.useMemo(() => {
    let str = 'ui-react-datepicker';
    if (required) {
      str = `${str} required`;
      if (!data) {
        str = `${str} error`;
      } else {
        str = `${str} success`;
      }
    }
    return str;
  }, [data, required]);

  return (
    <div className={className}>
      {title
      && (
        <div className="ui-react-datepicker__title font-type-b-10" title={title}>
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
          placeholderText={placeholderText}
          dateFormat="dd.MM.yyyy HH:mm:ss"
          showYearDropdown
          showTimeSelect={showTimeSelect}
          showTimeSelectOnly={showTimeSelectOnly}
          yearDropdownItemNumber={15}
          scrollableYearDropdown
          showMonthDropdown
          excludeTimes
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
