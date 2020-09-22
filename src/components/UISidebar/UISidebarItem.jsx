import React from 'react';
import { Link } from 'react-router-dom';

function UISidebarItem(props) {
  const {
    item,
    active,
  } = props || {};

  const {
    title,
    link,
    icon,
  } = item || {};

  return (
    <Link
      to={link}
      className={`ui-sidebar__item${active ? ' active' : ''}`}
    >
      <div className="ui-sidebar__item-icon">
        {icon && icon}
      </div>
      <div className="ui-sidebar__item-title">
        {title}
      </div>
    </Link>
  );
}

export default React.memo(UISidebarItem);
