import React from 'react';
import UISidebarItemLinkBtn from './UISidebarItemLinkBtn';
import UISidebarItemBtn from './UISidebarItemBtn';


function UISidebarItem(props) {
  const {
    item,
    active = false,
    open = false,
    subItems,
  } = props;

  const {
    title,
    link,
    icon,
  } = item || {};

  const [showSubMenu, setShowSubMenu] = React.useState(open);
  React.useEffect(() => setShowSubMenu(open), [open]);

  const handleShowSubMenu = React.useCallback(
    () => setShowSubMenu(!showSubMenu), [showSubMenu],
  );

  return (
    <li className={`ui-sidebar__item${active ? ' active' : ''}${showSubMenu ? ' open' : ''}`}>
      {(link && !active)
        ? (
          <UISidebarItemLinkBtn
            title={title}
            link={link}
            icon={icon}
            isArrow={subItems && Array.isArray(subItems)}
            callback={!showSubMenu && handleShowSubMenu}
          />
        )
        : (
            <UISidebarItemBtn
              title={title}
              icon={icon}
              callback={handleShowSubMenu}
              isArrow={subItems && Array.isArray(subItems)}
            />
        )}
      {subItems && Array.isArray(subItems) && <div className="ui-sidebar__sub-items-list">
        {subItems.map((v) => {
          if (!link) {
            return (
              <UISidebarItemLinkBtn
                key={v.id}
                title={v.title}
                link={v.link}
                icon={v.icon}
                active={v.active}
              />
            )
          }
          return v.component ? v.component(v) : null;
        })
        }
      </div>}
    </li>
  );
}

export default React.memo(UISidebarItem);
