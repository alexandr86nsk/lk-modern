import React from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import actions from "../../redux/actions/actions";
import { connect } from "react-redux";
import { v4 as uuidv4 } from 'uuid';


function SidebarItem(props) {
  const {
    title,
    icon,
    callback,
    id,
    testPageStoreAddReport,
    testPageStoreSetSection,
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

  const handleOpenWindowReport = React.useCallback((e, data) => {
    testPageStoreAddReport({
      id: uuidv4(),
      title: `Отчет: ${data.title}.`,
      type: '',
      reportType: data.id,
    });
  }, [testPageStoreAddReport]);

  const handleOpenTabReport = React.useCallback((e, data) => {
    const id = uuidv4();
    testPageStoreAddReport({
      id: id,
      title: `Отчет: ${data.title}.`,
      type: 'tab',
      reportType: data.id,
    });
    testPageStoreSetSection({
      mainReport: id,
    })
  }, [testPageStoreAddReport, testPageStoreSetSection]);

  return (
    <>
    <ContextMenuTrigger id={`sidebar-btn-${id}`}>
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
      </div>
    </div>
    </ContextMenuTrigger>
      <ContextMenu id={`sidebar-btn-${id}`}>
        <MenuItem data={{id, title}} onClick={handleOpenWindowReport}>
          Открыть отчет в окне
        </MenuItem>
        <MenuItem data={{id, title}} onClick={handleOpenTabReport}>
          Открыть отчет во вкладке
        </MenuItem>
      </ContextMenu>
      </>
  );
}

const mapDispatchToProps = { ...actions };

export default connect(null, mapDispatchToProps)(SidebarItem);
