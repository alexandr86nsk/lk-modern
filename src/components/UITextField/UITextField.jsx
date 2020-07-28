import React from 'react';
import './UITextField.scss';
import * as moment from 'moment';


function UITextField(props) {
  const {
    title,
    data,
    type = '',
    dateTime,
    dateFormat = 'LLL',
  } = props;

  const momentDate = React.useMemo(() => {
    if (dateTime && data) {
      moment.locale('ru');
      return moment(data).format(dateFormat);
    }
    return (data === 0 || data) ? data : '';
  }, [data, dateFormat, dateTime]);

  return (
    <div className={`ui-text-field ${type}`}>
      {title && <div className="ui-text-field__title font-type-b-10">{title}</div>}
      <div className="ui-text-field__body">
        {momentDate}
      </div>
    </div>
  );
}

export default React.memo(UITextField);
