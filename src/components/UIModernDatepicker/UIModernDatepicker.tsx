import React from 'react';
import './UIModernDatepicker.scss';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker, { DayValue } from 'react-modern-calendar-datepicker';
import InputMask from 'react-input-mask';
import ErrorIcon from './error-icon.svg';
import SuccessIcon from './check-icon.svg';
import localeRu from './locale_ru-RU';
import * as chrono from 'chrono-node';

interface IUIModernDatepickerProps {
  title?: string;
  name: string;
  callback: (name: string, value: Date | string) => void;
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
  } = props || {};

  const {
    toNativeDate,
  } = localeRu || {};

  const [selectedDay, setSelectedDay] = React.useState<DayValue>(null);

  console.log('selectedDay', selectedDay);

  if (selectedDay) {
    console.log('toNativeDate', toNativeDate(selectedDay));
  }

  const [focus, setFocus] = React.useState(false);

  const handleFocus = React.useCallback(() => {
    setFocus(true);
  }, []);

  const handleBlur = React.useCallback(() => {
    setFocus(false);
  }, []);

  /*  const handleChange = React.useCallback((date) => {
    if (callback) {
      if (date) {
        callback(name, endOfDay ? new Date(date.setHours(23, 59, 59, 999)) : date);
      } else {
        callback(name, date);
      }
    }
  }, [callback, endOfDay, name]); */

  const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (callback) {
      const { target } = event || {};
      const { value } = target || {};
      console.log('value', value);
      const tmp = value.split('.');
      const res = {
        year: tmp[2],
        month: tmp[1],
        day: tmp[0],
      };
      callback(name, tmp[2] && tmp[2].length === 4 ? toNativeDate(res) : value);
    }
  }, [toNativeDate, callback, name]);

  const renderValue = React.useMemo(() => {
    if (data) {
      const tmp = new Date(data);
      const tmp = value.split('.');
      const res = {
        year: tmp[2],
        month: tmp[1],
        day: tmp[0],
      };
      callback(name, tmp[2] && tmp[2].length === 4 ? toNativeDate(res) : value);
    }
  }, [toNativeDate, callback, name]);

  const className = React.useMemo(() => {
    let str = 'ui-modern-datepicker';
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

  const renderCustomInput = ({ ref }: { ref: React.RefObject<HTMLInputElement> }) => (
    <InputMask
      className="ui-modern-datepicker__input"
      onChange={handleChange}
      mask="00.00.0000"
      value={data}
      maskChar={null}
      formatChars={{
        0: '[0-9]',
        a: '[A-Za-z]',
        '*': '[A-Za-z0-9]',
      }}
      disabled={!!disabled}
      placeholder={placeholder}
    >
      {(inputProps: any) => (
        <input ref={ref} {...inputProps} />
      )}
    </InputMask>
  );

  return (
    <div className={className}>
      {title
      && (
        <div className="ui-modern-datepicker__title" title={title}>
          <span className="ellipsis-element">{title}</span>
          {required && <div className="required-icon">*</div>}
        </div>
      )}
      <div className="ui-modern-datepicker__body">
        <DatePicker
          value={selectedDay}
          onChange={setSelectedDay}
          renderInput={renderCustomInput}
          shouldHighlightWeekends
          locale={localeRu}
        />
        <div className="ui-modern-datepicker__error" title="Ошибка">
          <ErrorIcon />
        </div>
        <div className="ui-modern-datepicker__success" title="Верно">
          <SuccessIcon />
        </div>
      </div>
    </div>
  );
}

export default React.memo(UIModernDatepicker);
