import React from 'react';
import RightArrow from '../../../static/images/chevron_right-24px.svg';


function UISidebarItemBtn(props) {
  const {
    title,
    icon,
    callback,
    isArrow,
  } = props;

  const tooltipElem = React.useRef(null);

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
    if (e.target.closest('.ui-sidebar').classList.contains('hide')
      && !e.target.closest('.sub-items-list')
    ) {
      const target = e.target.closest('.ui-sidebar__btn');
      tooltipElem.current = document.createElement('div');
      tooltipElem.current.className = 'ui-sidebar__tooltip font-type-m-12';
      tooltipElem.current.innerHTML = title;
      document.body.append(tooltipElem.current);

      const coords = target.getBoundingClientRect();
      const left = coords.left + target.offsetWidth + 16;
      const height = (target.offsetHeight - tooltipElem.current.offsetHeight) / 2;
      const { top } = coords;
      tooltipElem.current.style.left = `${left}px`;
      tooltipElem.current.style.top = `${top + height}px`;
    }
  }, [title]);

  const onToggleOut = React.useCallback(() => {
    if (tooltipElem.current) {
      tooltipElem.current.remove();
      tooltipElem.current = null;
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
