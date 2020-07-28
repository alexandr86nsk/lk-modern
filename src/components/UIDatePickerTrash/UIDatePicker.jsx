import React, { useState, useRef, useCallback } from 'react';
import './UIDatePicker.scss';
import InputMask from 'react-input-mask';
import UICalendar from '../UICalendar/UICalendar';
import useOutsideClick from '../UICustomHooks/useOutsideClick/useOutsideClick';
import CalendarIcon from '../../static/images/date_range-24px.svg';


const UIDatePicker = (props) => {
  const {
    callback,
    name,
    data,
    title,
  } = props;

  const [showCalendar, setShowCalendar] = useState(false);
  const datePickerEl = useRef(null);
  useOutsideClick(datePickerEl, () => setShowCalendar(false));

  const cbCalendarFn = useCallback((value) => {
    callback(name, value);
    setShowCalendar(false);
  }, [callback, name]);

  const handleChangeInput = React.useCallback((e) => {
    if (callback) {
      callback(name, e.target.value);
    }
  }, [callback, name]);

  const handleChangeCalendarView = React.useCallback(() => {
    setShowCalendar(!showCalendar);
  }, [showCalendar]);

  return (
    <div
      className={`ui-datepicker ${showCalendar ? 'show' : ''}`}
      ref={datePickerEl}
    >
      {title && (
      <div className="ui-datepicker__title font-type-b-10">
        <span className="ellipsis-element">{title}</span>
      </div>
      )}
      <div className="ui-datepicker__input">
        <InputMask
          className="font-type-m-14"
          placeholder=""
          value={data || ''}
          onChange={handleChangeInput}
          alwaysShowMask={false}
          mask="00.00.0000"
          maskChar={null}
          formatChars={{
            0: '[0-9]',
            a: '[A-Za-z]',
            '*': '[A-Za-z0-9]',
          }}
        />
        <div
          role="presentation"
          className="ui-datepicker__button"
          onClick={handleChangeCalendarView}
        >
          <CalendarIcon />
        </div>
      </div>
      {showCalendar
      && (
      <div className="ui-datepicker__calendar-wrapper">
        <div
          role="presentation"
          className="ui-datepicker__calendar-background"
          onClick={handleChangeCalendarView}
        />
        <UICalendar callback={cbCalendarFn} data={data} />
      </div>
      )}
    </div>
  );
};

export default React.memo(UIDatePicker);
