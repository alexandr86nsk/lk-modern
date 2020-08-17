import React from 'react';
import { connect } from 'react-redux';
import './CalendarPage.scss';
import Calendar from 'rc-year-calendar';
import 'rc-year-calendar/locales/rc-year-calendar.ru';
import moment from 'moment';
import actions from '../../redux/actions/actions';
import UIBlockTitle from '../../components/UIBlockTitle/UIBlockTitle';
import UIElementTitle from '../../components/UIElementTitle/UIElementTitle';
import UILoader from '../../components/UILoader/UILoader';
import WarningIcon from '../../static/images/warning-24px.svg';
import ChangeDayModalBody from './ChangeDayModalBody';

const MenuItem = (props) => {
  const {
    description,
    date,
    isHoliday,
    callback,
    id,
  } = props || {};

  const handleClick = React.useCallback(() => {
    if (callback) {
      callback({
        isHoliday,
        date: isHoliday ? date : new Date(date.setHours(23, 59, 59, 999)),
        id,
      });
    }
  }, [id, isHoliday, date, callback]);

  return (
    <div
      role="presentation"
      className="context-menu__item"
      onClick={handleClick}
    >
      <i className="icon exchange" aria-hidden />
      <span className="text" aria-hidden>{description || ''}</span>
    </div>
  );
};

function CalendarPage(props) {
  const {
    holidays,
    holidaysLoading,
    calendarStoreGetHolidays,
    calendarStoreGetHolidaysCancel,
    modalStoreSetSection,
    calendarStoreChangeDay,
    calendarStoreChangeDayCancel,
    modalStoreClear,
  } = props || {};

  const contextMenuRef = React.useRef(null);
  const [contextMenu, setContextMenu] = React.useState(null);

  const {
    style: contextMenuStyle,
    items: contextMenuItems,
  } = contextMenu || {};

  const currentDate = React.useMemo(() => new Date(), []);

  const calendarData = React.useMemo(() => {
    if (holidays && Array.isArray(holidays)) {
      return holidays.map((v) => {
        const {
          dateHoliday,
          description,
          id: thisId,
        } = v || {};
        return {
          id: thisId,
          color: 'rgba(183, 109, 171, .85)',
          name: description,
          startDate: new Date(dateHoliday),
          endDate: new Date(dateHoliday),
          holiday: true,
        };
      });
    }
    return [];
  }, [holidays]);

  const changeDay = React.useCallback((value) => {
    const { changeDescription, date, id: thisId } = value || {};
    calendarStoreChangeDay({
      dateHoliday: date,
      description: changeDescription,
      id: thisId,
    });
  }, [calendarStoreChangeDay]);

  const handleChangeDay = React.useCallback((value) => {
    moment.locale('ru');
    const { isHoliday, date, id: thisId } = value || {};
    modalStoreSetSection({
      show: true,
      tempData: {
        changeDescription: '',
        date,
        id: thisId,
      },
      outputBody: {
        icon: <WarningIcon />,
        title: 'Важно',
        body: <ChangeDayModalBody title={moment(date).format('LL')} isHoliday={isHoliday} />,
      },
      asyncClose: true,
      callback: changeDay,
    });
  }, [changeDay, modalStoreSetSection]);

  const handleSetContextMenu = React.useCallback((e) => {
    const {
      element,
      date,
      events,
    } = e || {};
    const el = element.getBoundingClientRect();
    const {
      top,
      bottom,
      left,
      right,
    } = el || {};
    const menuStyle = {
      visibility: 'unset',
      transform: 'unset',
      opacity: '1',
      left: document.body.offsetWidth - right > 160
        ? `${right + 2}px`
        : undefined,
      right: document.body.offsetWidth - right < 160
        ? `${document.body.offsetWidth - left + 2}px`
        : undefined,
      top: document.body.offsetHeight - bottom > 60
        ? `${top + 5}px`
        : undefined,
      bottom: document.body.offsetHeight - bottom < 60
        ? `${document.body.offsetHeight - bottom + 5}px`
        : undefined,
    };
    const eventValues = events && Array.isArray(events) && events[0];
    const {
      id: thisId,
      holiday,
    } = eventValues || {};
    const menuItems = (
      <MenuItem
        description={holiday ? 'Сделать рабочим' : 'Сделать не рабочим'}
        date={date}
        id={thisId}
        isHoliday={holiday}
        callback={handleChangeDay}
      />
    );
    setContextMenu({
      style: menuStyle,
      items: menuItems,
    });
  }, [handleChangeDay]);

  /* ***************************** mount ********************** */
  React.useEffect(() => {
    calendarStoreGetHolidays();
  }, [
    calendarStoreGetHolidays,
  ]);

  React.useEffect(() => {
    function handleClickEscape(event) {
      if (event.key === 'Escape') {
        if (contextMenuStyle) {
          setContextMenu(null);
        }
      }
    }
    function handleClickMouse(event) {
      const { current } = contextMenuRef || {};
      if (current && !current.contains(event.target)) {
        if (contextMenuStyle) {
          setContextMenu(null);
        }
      }
    }
    function handleScroll() {
      setContextMenu(null);
    }
    document.addEventListener('keydown', handleClickEscape);
    document.addEventListener('mousedown', handleClickMouse);
    document.addEventListener('scroll', handleScroll, true);
    return () => {
      document.removeEventListener('keydown', handleClickEscape);
      document.removeEventListener('mousedown', handleClickMouse);
      document.removeEventListener('scroll', handleScroll, true);
    };
  }, [contextMenuStyle]);
  /* ********************************************************** */

  /* ***************************** update ********************** */

  /* ********************************************************** */

  /* ***************************** unmount ********************** */
  React.useEffect(() => () => {
    calendarStoreGetHolidaysCancel();
    calendarStoreChangeDayCancel();
    modalStoreClear();
  }, [
    calendarStoreGetHolidaysCancel,
    calendarStoreChangeDayCancel,
    modalStoreClear,
  ]);
  /* ********************************************************** */

  return (
    <div className="calendar-page page__content">
      <UIBlockTitle title="Календарь" />
      <div className="element-wrapper">
        <UIElementTitle title="Календарь" />
        {holidaysLoading && <UILoader text="Загружаем нерабочие дни" dimmed />}
        <div className="calendar">
          <Calendar
            style="background"
            minDate={currentDate}
            language="ru"
            dataSource={calendarData}
            enableContextMenu
            onDayContextMenu={handleSetContextMenu}
          />
          <div
            className="calendar__context-menu context-menu menu transition"
            style={contextMenuStyle}
            ref={contextMenuRef}
          >
            {contextMenuItems}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  holidays: state.calendarStore.holidays,
  holidaysLoading: state.calendarStore.holidaysLoading,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(CalendarPage);
