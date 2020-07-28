import React, { useState } from 'react';
import './UICalendar.scss';
import UISelect from '../UISelect/UISelect';
import NextIcon from './UICalendar-next-icon.svg';
import PrevIcon from './UICalendar-prev-icon.svg';


const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

const dayOfWeek = [
  'Пн',
  'Вт',
  'Ср',
  'Чт',
  'Пт',
  'Сб',
  'Вс',
];

const dateToString = (data) => {
  const month = data.getMonth() + 1;
  const day = data.getDate();
  const year = data.getFullYear();
  const getFullMonth = () => {
    if (month < 10) {
      return '.0';
    }
    return '.';
  };
  const getFullDay = () => {
    if (day < 10) {
      return '0';
    }
    return '';
  };
  return `${getFullDay() + day + getFullMonth() + month}.${year}`;
};

const UICalendar = (props) => {
  const {
    callback,
    data,
  } = props;
  // eslint-disable-next-line max-len
  console.log('data', data);
  const [currentViewDate, setCurrentViewDate] = useState(new Date(new Date(data || new Date()).setDate(1)));
  console.log('currentViewDate', currentViewDate);

  const changeDay = (value) => {
    const date = new Date(currentViewDate);
    date.setDate(value + 1);
    callback(dateToString(date));
  };

  const changeMonth = (e) => {
    const next = e.currentTarget.className.indexOf('next') >= 0;
    const date = new Date(currentViewDate);
    const month = next ? date.getMonth() + 1 : date.getMonth() - 1;
    date.setMonth(month);
    setCurrentViewDate(date);
  };

  const presentDate = new Date();
  const currentViewFullYear = currentViewDate.getFullYear();
  const currentViewMonth = currentViewDate.getMonth();
  const startDayInMonth = new Date(currentViewFullYear, currentViewMonth, 1);
  const endDayInMonth = new Date(currentViewFullYear, currentViewMonth + 1, 0);
  const previousMonth = new Date(currentViewFullYear, currentViewMonth, 0).getDate();
  const days = [];
  const years = [];
  let daysInPrevMonth = 0;

  for (let i = presentDate.getFullYear(); i > presentDate.getFullYear() - 100; i -= 1) {
    years.push(i);
  }

  const renderWeek = dayOfWeek.map((v) => (
    <div
      key={v}
      className={`ui-calendar__label font-type-m-14 ${v === 'Сб' || v === 'Вс' ? 'weekend' : ''}`}
    >
      {v}
    </div>
  ));

  if (startDayInMonth.getDay() === 0) {
    daysInPrevMonth = 6;
  } else {
    daysInPrevMonth = startDayInMonth.getDay() - 1;
  }

  for (let i = daysInPrevMonth; i > 0; i -= 1) {
    days.push(
      <div key={`startFiller${i}`} className="ui-calendar__filler">
        {previousMonth + 1 - i}
      </div>,
    );
  }

  for (let i = 0; i < endDayInMonth.getDate(); i += 1) {
    let className = 'ui-calendar__day';
    if (currentViewDate
      && currentViewDate.getMonth() === presentDate.getMonth()
      && presentDate.getDate() - 1 === i
      && currentViewDate.getFullYear() === presentDate.getFullYear()) {
      className += ' present';
    }
    if (currentViewDate
      && currentViewDate.getMonth() === data.getMonth()
      && data.getDate() - 1 === i
      && currentViewDate.getFullYear() === data.getFullYear()) {
      className += ' pick';
    }
    days.push(
      <div
        role="presentation"
        key={`day${i}`}
        className={className}
        onClick={() => changeDay(i)}
      >
        {i + 1}
      </div>,
    );
  }

  if (daysInPrevMonth < 0) {
    daysInPrevMonth = 0;
  }
  let calendarGrid = 35;
  if (daysInPrevMonth + endDayInMonth.getDate() > 35) {
    calendarGrid = 42;
  }
  const daysInNextMonth = calendarGrid - daysInPrevMonth - endDayInMonth.getDate();

  for (let i = 0; i < daysInNextMonth; i += 1) {
    days.push(
      <div key={`endFiller${i}`} className="ui-calendar__filler">
        {i + 1}
      </div>,
    );
  }

  return (
    <div className="ui-calendar">
      <div className="ui-calendar__header">
        <div
          role="presentation"
          className="ui-calendar__action ui-calendar__action-prev"
          onClick={changeMonth}
        >
          <PrevIcon />
        </div>
        <div className="ui-calendar__date">
          <span className="font-type-m-14">
            {months[currentViewDate.getMonth()]}
          </span>
          <div className="ui-calendar__year">
            <UISelect
              selected={currentViewDate ? currentViewDate.getFullYear() : ''}
              maxHeight={200}
              options={years}
              callback={(value) => setCurrentViewDate(new Date(currentViewDate.setFullYear(value)))}
            />
          </div>
        </div>
        <div
          role="presentation"
          className="ui-calendar__action ui-calendar__action-next"
          onClick={changeMonth}
        >
          <NextIcon />
        </div>
      </div>
      <div className="ui-calendar__body font-type-m-14">
        {renderWeek}
        {days}
      </div>
    </div>
  );
};

export default UICalendar;
