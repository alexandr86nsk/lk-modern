import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const ListItem = (props) => {
  const {
    item,
    removeCallback,
  } = props || {};

  const {
    fio,
    phone,
    commission,
  } = item || {};

  const removeClick = React.useCallback(() => {
    if (removeCallback) {
      removeCallback(item);
    }
  }, [item, removeCallback]);

  return (
    <div className="list__item element-wrapper">
      {fio && (
        <div className="list__item-column">
          <div className="title">Ф.И.О.</div>
          <div className="value">{fio}</div>
        </div>
      )}
      {phone && (
        <div className="list__item-column">
          <div className="title">Телефон</div>
          <div className="value">{phone}</div>
        </div>
      )}
      {commission && (
        <div className="list__item-column">
          <div className="title">Комиссия</div>
          <div className="value">{commission}</div>
        </div>
      )}
      <div className="list__item-column controls">
        <Button
          circular
          negative
          size="mini"
          onClick={removeClick}
        >
          <Icon name="remove" />
          Открепить
        </Button>
      </div>
    </div>
  );
};

export default ListItem;
