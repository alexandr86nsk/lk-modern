import React from 'react';
import './UIDropdownMenu.scss';
import { Dropdown } from 'semantic-ui-react';
import UIDropdownMenuItem from './UIDropdownMenuItem';

function UIDropdownMenu(props) {
  const {
    title,
    items,
    menuDirection,
    callback,
    ...otherProps
  } = props || {};

  const renderItems = React.useMemo(() => {
    if (items && Array.isArray(items)) {
      return items.map((v) => {
        const { id } = v || {};
        return (
          <UIDropdownMenuItem
            key={id}
            callback={callback}
            {...v}
          />
        );
      });
    }
    return null;
  }, [items, callback]);

  return (
    <div className="ui-dropdown-menu">
      <Dropdown text={title} {...otherProps}>
        <Dropdown.Menu direction={menuDirection}>
          {renderItems}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default React.memo(UIDropdownMenu);
