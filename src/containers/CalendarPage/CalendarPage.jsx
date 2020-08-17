import React from 'react';
import { connect } from 'react-redux';
import './CalendarPage.scss';
import Calendar from 'react-calendar';
import actions from '../../redux/actions/actions';
import UIBlockTitle from '../../components/UIBlockTitle/UIBlockTitle';
import UIElementTitle from '../../components/UIElementTitle/UIElementTitle';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';

function CalendarPage(props) {
  const {
    zoneStoreGetZones,
    zoneStoreGetZonesCancel,
    zoneStoreGetUsers,
    zoneStoreGetUsersCancel,
    zoneStoreClear,
  } = props || {};

  /* ***************************** mount ********************** */
  React.useEffect(() => {
    zoneStoreGetZones({ key: 'zone' });
    zoneStoreGetUsers({ key: 'zone' });
    zoneStoreGetUsers({ key: 'subZone' });
  }, [
    zoneStoreGetZones,
    zoneStoreGetUsers,
  ]);
  /* ********************************************************** */

  /* ***************************** update ********************** */

  /* ********************************************************** */

  /* ***************************** unmount ********************** */
  React.useEffect(() => () => {
    zoneStoreGetZonesCancel();
    zoneStoreGetUsersCancel();
    zoneStoreClear();
  }, [
    zoneStoreGetZonesCancel,
    zoneStoreGetUsersCancel,
    zoneStoreClear,
  ]);
  /* ********************************************************** */

  return (
    <div className="reports-page page__content">
      <UIBlockTitle title="Календарь" />
      <div className="element-wrapper">
        <UIElementTitle title="Календарь" />
        {/* <Calendar
          startDate={moment()}
          endDate={moment().endOf('year')}
          weekNumbers
          size={12}
          mods={
          [
            {
              date: moment(),
              classNames: ['current'],
              component: ['day', 'month', 'week'],
            },
          ]
        }
        /> */}
        <Calendar
          firstMonth={1}
          date={moment('2014-01-01')}
          weekNumbers
          size={12}
          startDate={moment()}
          endDate={moment().endOf('year')}
          mods={
          [
            {
              component: ['day'],
              events: {
                onClick: (date) => alert(date),
              },
            },
          ]
        }
        />
      </div>
    </div>
  );
}

const mapDispatchToProps = { ...actions };

export default connect(null, mapDispatchToProps)(CalendarPage);
