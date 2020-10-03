import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const intViewportWidth = window && window.innerWidth ? window.innerWidth : null;

function UIRsuiteTableDropdownMenu(props) {
  const {
    data,
    actions,
  } = props || {};

  const handleEdit = React.useCallback(() => actions.edit(data), [actions, data]);

  const handleRemove = React.useCallback(() => actions.remove(data), [actions, data]);

  return (
    <Dropdown
      icon="ellipsis horizontal"
      floating
      className="ui-rsuite-table__dropdown-menu"
    >
      <Dropdown.Menu direction={intViewportWidth && intViewportWidth < 768 ? 'right' : 'left'}>
        {actions.edit && <Dropdown.Item icon="edit" text="Изменить" onClick={handleEdit} />}
        {actions.remove && <Dropdown.Item icon="trash" text="Удалить" onClick={handleRemove} />}
        {actions.custom && actions.custom.map((v) => (
          <Dropdown.Item
            key={v.id}
            icon={v.icon || 'question'}
            text={v.text || ''}
            onClick={() => (v.action ? v.action(data) : console.log('Действие не указано'))}
          />
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default React.memo(UIRsuiteTableDropdownMenu);
