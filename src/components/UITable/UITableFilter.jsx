import React from 'react';
import { Button, Icon } from "semantic-ui-react";


function UITableFilter(props) {
  const {
    filterBody,
    filterClear,
    filterClose,
  } = props;

  const handleClear = React.useCallback(() => {
    if (filterClear) {
      filterClear();
    }
  }, [filterClear]);

  const handleClose = React.useCallback(() => {
    if (filterClose) {
      filterClose();
    }
  }, [filterClose]);

  return (
    <div className="ui-table__filter font-type-m-11 active absolute">
      <div className="filter__body">
        {filterBody}
        <div className="filter__clear-block">
          <Button size="small" negative title="Очистить" onClick={handleClear}>
            <Icon name="close" />
            Очистить
          </Button>
          <Button size="small" positive title="Применить" onClick={handleClose}>
            <Icon name="check" />
            Применить
          </Button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(UITableFilter);
