import React from 'react';
import RightArrow from '../../../static/images/chevron_right-24px.svg';


function UISidebarItemBtn(props) {
  const {
    title,
    icon,
    callback,
    isArrow,
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
      const target = e.target.closest('.ui-sidebar__btn');
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

  return (
    <div
      role="presentation"
      className="ui-sidebar__btn"
      onClick={callback}
      onMouseOver={onToggleOver}
      onMouseOut={onToggleOut}
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
    </div>
  );
}

export default React.memo(UISidebarItemBtn);
