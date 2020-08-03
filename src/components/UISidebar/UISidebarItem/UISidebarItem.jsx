import React from 'react';
import AnimateHeight from 'react-animate-height';
import UISidebarItemLinkBtn from './UISidebarItemLinkBtn';
import UISidebarItemBtn from './UISidebarItemBtn';

const heightVariables = {
  true: 'auto',
  false: 0,
};

function UISidebarItem(props) {
  const {
    item,
    active = false,
    isOpen = false,
    subItems = [],
    searchValue,
    showSidebar,
  } = props;

  const {
    title,
    link,
    icon,
  } = item;

  const menuElem = React.useRef(null);
  const subMenuListElem = React.useRef(null);

  const [showSubMenu, setShowSubMenu] = React.useState(false);
  React.useEffect(
    () => {
      if (!showSubMenu && isOpen) {
        setShowSubMenu(isOpen);
      }
    }, [showSubMenu, isOpen],
  );

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (menuElem.current && !menuElem.current.contains(event.target)) {
        setShowSubMenu(false);
      }
    }
    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  });

  const memoizedSubMenuList = React.useMemo(() => (
    <div className="ui-sidebar__sub-items-list" ref={subMenuListElem}>
      {
           subItems && Array.isArray(subItems) && subItems.length > 0 && subItems.map((v) => {
             if (searchValue) {
               if (v.title.toLowerCase().includes(searchValue.toLowerCase())) {
                 return (
                   <UISidebarItemLinkBtn
                     key={v.id}
                     title={v.title}
                     link={v.link}
                     icon={v.icon}
                     active={v.active}
                     hideTooltip
                   />
                 );
               }
               return null;
             }
             return (
               <UISidebarItemLinkBtn
                 key={v.id}
                 title={v.title}
                 link={v.link}
                 icon={v.icon}
                 active={v.active}
                 hideTooltip
               />
             );
           })
          }
    </div>
  ), [
    searchValue,
    subItems,
  ]);

  const subMenuStyle = React.useMemo(() => {
    if (!showSidebar && subItems.length > 0) {
      const target = menuElem.current;
      const subTarget = subMenuListElem.current;
      const coords = target.getBoundingClientRect();
      const subCoords = subTarget.getBoundingClientRect();
      const { top, bottom } = coords;
      if (coords.bottom > subCoords.height) {
        return {
          top: `${top}px`,
        };
      }
      return {
        bottom: `${bottom}px`,
      };
    }
    return {};
  }, [subItems.length, showSidebar]);

  const handleShowSubMenu = React.useCallback(
    () => setShowSubMenu(!showSubMenu),
    [showSubMenu],
  );

  return (
    <li
      className={`ui-sidebar__item${active ? ' active' : ''}${showSubMenu && showSidebar ? ' open' : ''}`}
      ref={menuElem}
    >
      {link
        ? (
          <UISidebarItemLinkBtn
            title={title}
            link={link}
            icon={icon}
          />
        )
        : (
          <>
            <UISidebarItemBtn
              title={title}
              icon={icon}
              callback={handleShowSubMenu}
              isArrow
            />
            {(showSidebar || showSubMenu) && (
            <div
              className="ui-sidebar__sub-items-list-wrapper"
              style={subMenuStyle}
            >
              <AnimateHeight
                duration={300}
                height={showSidebar ? heightVariables[showSubMenu] : 'auto'}
              >
                {memoizedSubMenuList}
              </AnimateHeight>
            </div>
            )}
          </>
        )}
    </li>
  );
}

export default React.memo(UISidebarItem);
