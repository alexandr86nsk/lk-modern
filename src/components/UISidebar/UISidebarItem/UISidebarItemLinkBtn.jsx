import React from 'react';
import { Link } from 'react-router-dom';
import RightArrow from "../../../static/images/chevron_right-24px.svg";


function UISidebarItemLinkBtn(props) {
  const {
    title,
    link,
    icon,
    active,
    isArrow,
    callback,
  } = props;

  let tooltipElem;

  const renderTitle = React.useMemo(
    () => {
      const arr = title.split(' ');
      if (arr.length > 2) {
        return (
          <>
            <span>{`${arr[0]} ${arr[1]}`}</span>
            <span>{`${arr[2]}${arr[3] ? arr[3] : ''}`}</span>
          </>
        );
      }
      return title;
    },
    [title],
  );

  const onToggleOver = React.useCallback((e) => {
    if (e.target.closest('.ui-sidebar').classList.contains('hide')) {
      const target = e.target.closest('.ui-sidebar__link-btn');
      tooltipElem = document.createElement('div');
      tooltipElem.className = 'ui-sidebar__tooltip font-type-m-12';
      tooltipElem.innerHTML = title;
      document.body.append(tooltipElem);

      const coords = target.getBoundingClientRect();
      const left = coords.left + target.offsetWidth + 16;
      const height = (target.offsetHeight - tooltipElem.offsetHeight) / 2;
      const { top } = coords;
      tooltipElem.style.left = `${left}px`;
      tooltipElem.style.top = `${top + height}px`;
    }
  }, [title]);

  const onToggleOut = React.useCallback(() => {
    if (tooltipElem) {
      tooltipElem.remove();
      tooltipElem = null;
    }
  }, []);

  const handleActiveClick = React.useCallback((e) => {
    if (isArrow && callback) {
      callback();
    }
    onToggleOut();
  }, [onToggleOut, callback, isArrow]);

  return (
    <Link
      to={link}
      className={`ui-sidebar__link-btn${active ? ' active' : ''}`}
      onMouseOver={onToggleOver}
      onMouseOut={onToggleOut}
      onClick={handleActiveClick}
    >
      <div>
        {icon && icon}
      </div>
      <div>
        <div className="ui-sidebar__btn-title">
          {renderTitle}
        </div>
        {isArrow && <RightArrow className="ui-sidebar__btn-arrow" />}
      </div>
    </Link>
  );
}

export default React.memo(UISidebarItemLinkBtn);
