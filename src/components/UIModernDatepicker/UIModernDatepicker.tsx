import React from 'react';
import './UIModernDatepicker.scss';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from 'react-modern-calendar-datepicker';
import InputMask from 'react-input-mask';
import ErrorIcon from './error-icon.svg';
import SuccessIcon from './check-icon.svg';

interface IUIModernDatepickerProps {
  title?: string;
  name: string;
  callback: (name: string, value: string) => void;
  data: string | number;
  disabled?: boolean;
  type?: string;
  required?: boolean;
  endOfDay?: boolean;
  placeholder?: string;
}

function UIModernDatepicker(props: IUIModernDatepickerProps) {
  const {
    title,
    name,
    data,
    type,
    callback,
    required,
    endOfDay,
    disabled,
    placeholder = 'Выберите дату',
    ...moreProps
  } = props || {};

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
    if (title) {
      str = `${str} title`;
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
  }, [title, data, focus, required, type]);

  const renderCustomInput = ({ ref }) => (
    <input
      ref={ref}
      placeholder={placeholder}
      value={data}
      className="my-custom-input-class"
    />
  );

  return (
    <div className={className}>
      {title
      && (
        <div className="ui-react-datepicker__title" title={title}>
          <span className="ellipsis-element">{title}</span>
          {required && <div className="required-icon">*</div>}
        </div>
      )}
      <div className="ui-react-datepicker__body">
        <DatePicker
          value={selectedDay}
          onChange={setSelectedDay}
          renderInput={renderCustomInput} // render a custom input
          shouldHighlightWeekends
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

export default React.memo(UIModernDatepicker);
