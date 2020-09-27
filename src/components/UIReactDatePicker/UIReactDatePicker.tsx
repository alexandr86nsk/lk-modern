import React from 'react';
import './UIReactDatePicker.scss';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';
import InputMask from 'react-input-mask';
import ErrorIcon from './error-icon.svg';
import SuccessIcon from './check-icon.svg';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
registerLocale('ru', ru);

interface IUIReactDatePickerProps {
  title?: string;
  name: string;
  callback: (name: string, value: number | Date) => void;
  label?: string;
  data: string;
  type?: string;
  showTimeSelect?: boolean;
  showTimeSelectOnly?: boolean;
  required?: boolean;
  hint?: boolean;
  endOfDay?: boolean;
  startOfDay?: boolean;
  disabled?: boolean;
  placeholder?: string;
  isClearable?: boolean;
}

function UIReactDatePicker(props: IUIReactDatePickerProps) {
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
    startOfDay,
    disabled,
    placeholder,
    isClearable = true,
    ...moreProps
  } = props || {};

  const renderPlaceholder = React.useMemo(() => {
    if (placeholder) {
      return placeholder;
    }
    if (type && type.includes('--translate-title')) {
      return '';
    }
    return 'Выберите дату';
  }, [placeholder, type]);

  const elRef = React.useRef<HTMLHeadingElement | null>(null);
  const [focus, setFocus] = React.useState(false);

  const handleFocus = React.useCallback(() => {
    setFocus(true);
  }, []);

  const handleBlur = React.useCallback(() => {
    setFocus(false);
  }, []);

  const handleChange = React.useCallback((date: Date) => {
    if (callback) {
      if (date) {
        if (endOfDay) {
          callback(name, new Date(date.setHours(23, 59, 59, 999)));
        } else if (startOfDay) {
          callback(name, new Date(date.setHours(0, 0, 0, 0)));
        } else {
          callback(name, date);
        }
      } else {
        callback(name, date);
        if (elRef) {
          const { current } = elRef || {};
          const inputs = current.getElementsByTagName('input');
          if (inputs && inputs[0]) {
            inputs[0].focus();
          }
        }
      }
    }
  }, [callback, startOfDay, endOfDay, name]);

  const className = React.useMemo(() => {
    let str = 'ui-react-datepicker';
    if (focus) {
      str = `${str} focus`;
    }
    if (data) {
      str = `${str} data`;
    } else {
      str = `${str} empty`;
    }
    if (required) {
      str = `${str} required`;
      if (!data) {
        str = `${str} error`;
      } else {
        str = `${str} success`;
      }
    }
    if (type) {
      str = `${str} ${type}`;
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
      <div className="ui-react-datepicker__body" ref={elRef}>
        <DatePicker
          {...moreProps}
          selected={data ? new Date(data) : null}
          onChange={handleChange}
          locale="ru"
          disabled={disabled}
          placeholderText={renderPlaceholder}
          dateFormat="dd.MM.yyyy HH:mm:ss"
          showYearDropdown
          showTimeSelect={showTimeSelect}
          showTimeSelectOnly={showTimeSelectOnly}
          yearDropdownItemNumber={15}
          scrollableYearDropdown
          showMonthDropdown
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
