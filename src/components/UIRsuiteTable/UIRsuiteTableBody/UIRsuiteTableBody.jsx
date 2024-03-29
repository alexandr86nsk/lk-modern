import React from 'react';
import './UIRsuiteTableBody.scss';
import { Table, Column, HeaderCell } from 'rsuite-table';
import 'rsuite-table/lib/less/index.less';
import UIRsuiteTableCell from './UIRsuiteTableCell';
import UIRsuiteTableMenuItem from './UIRsuiteTableMenuItem';

function UIRsuiteTableBody(props) {
  const {
    customId,
    tableData = [],
    tableTemplate,
    tableEmptyMessage = 'Нет данных',
    tableLoadingMessage = 'Загрузка...',
    contextMenu = true,
    actions,
    onRowClick,
    onRowDoubleClick,
    sortSortingValue,
    sortSetSortingValue,
    tableOnColumnResizeCallback,
    tableLoading,
    tableLoader,
    tableHeaderHeight = 28,
    tableRowHeight = 28,
    tableIsResizable = true,
    tableBodyHeight,
    tableVirtualized = true,
    tableIsAutoHeight,
    cellBordered,
    bordered,
  } = props || {};

  const {
    sortColumn,
    sortType,
  } = sortSortingValue || {};

  const contextMenuRef = React.useRef(null);
  const [contextMenuData, setContextMenuData] = React.useState(null);

  const [customActionsMenu, setCustomActionsMenu] = React.useState(null);

  React.useEffect(() => {
    if (!customActionsMenu && actions) {
      setCustomActionsMenu(actions);
    }
  }, [customActionsMenu, actions]);

  const handleUpload = React.useCallback((fn, files) => {
    if (contextMenuData) {
      fn(contextMenuData.rowData, files);
      setContextMenuData(null);
    }
  }, [contextMenuData]);

  const handleCustomAction = React.useCallback((fn) => {
    if (contextMenuData) {
      fn(contextMenuData.rowData);
      setContextMenuData(null);
    }
  }, [contextMenuData]);

  React.useEffect(() => {
    function handleClickEscape(event) {
      if (event.key === 'Escape') {
        if (contextMenuData) {
          setContextMenuData(null);
        }
      }
    }
    function handleClickMouse(event) {
      const { current } = contextMenuRef || {};
      if (current && !current.contains(event.target)) {
        if (contextMenuData) {
          setContextMenuData(null);
        }
      }
    }
    function handleScroll() {
      setContextMenuData(null);
    }
    document.addEventListener('keydown', handleClickEscape);
    document.addEventListener('mousedown', handleClickMouse);
    document.addEventListener('scroll', handleScroll, true);
    return () => {
      document.removeEventListener('keydown', handleClickEscape);
      document.removeEventListener('mousedown', handleClickMouse);
      document.removeEventListener('scroll', handleScroll, true);
    };
  }, [contextMenuData]);

  const handleSetSortingValue = React.useCallback((sortColumnValue, sortTypeValue) => {
    if (sortSetSortingValue) {
      sortSetSortingValue({
        sortColumn: sortColumnValue,
        sortType: sortTypeValue,
      });
    }
  }, [sortSetSortingValue]);

  const renderContextMenu = React.useMemo(() => {
    if (contextMenu) {
      const items = [];
      if (customActionsMenu && Array.isArray(customActionsMenu)) {
        customActionsMenu.forEach((v) => {
          const {
            id,
          } = v || {};
          items.push(
            <UIRsuiteTableMenuItem
              key={id}
              item={v}
              callback={handleCustomAction}
              uploadCallback={handleUpload}
            />,
          );
        });
      }
      return items;
    }
    return null;
  }, [
    customActionsMenu,
    handleUpload,
    handleCustomAction,
    contextMenu,
  ]);

  const handleSetContextMenuData = React.useCallback((rowData, e) => {
    if (actions && Array.isArray(actions)) {
      e.preventDefault();
      e.stopPropagation();

      setCustomActionsMenu(actions.filter((v) => !v.showCondition
        || (v.showCondition && v.showCondition(rowData))));
    }

    if (contextMenu) {
      const { current } = contextMenuRef || {};
      const menuStyle = {
        visibility: 'unset',
        transform: 'unset',
        left: document.body.offsetWidth - e.clientX - current.offsetWidth > 0
          ? `${e.clientX}px`
          : undefined,
        right: document.body.offsetWidth - e.clientX - current.offsetWidth < 0
          ? `${document.body.offsetWidth - e.clientX}px`
          : undefined,
        top: document.body.offsetHeight - e.clientY - current.offsetHeight > 0
          ? `${e.button === 0 ? (e.clientY + 7) : e.clientY}px`
          : undefined,
        bottom: document.body.offsetHeight - e.clientY - current.offsetHeight < 0
          ? `${e.button === 0 ? (document.body.offsetHeight - e.clientY + 7) : document.body.offsetHeight - e.clientY}px`
          : undefined,
      };

      setContextMenuData({ rowData, menuStyle });
    }
  }, [
    actions,
    contextMenu,
  ]);

  const memoizedTableColumns = React.useMemo(() => {
    if (tableTemplate && Array.isArray(tableTemplate)) {
      return tableTemplate.map((v) => {
        const {
          id,
          title = '',
          width,
          fixed,
          dataKey,
          column = {},
          type,
        } = v || {};
        const isActions = type && type.includes('actions');
        return (
          <Column
            key={id}
            width={width}
            resizable={tableIsResizable}
            fixed={fixed}
            {...column}
            onResize={tableOnColumnResizeCallback}
          >
            <HeaderCell
              className={isActions ? 'actions' : ''}
              title={title}
              depth={0}
              width={width}
            >
              <div className="ui-rsuite-table__header-title">{title}</div>
            </HeaderCell>
            <UIRsuiteTableCell
              tableData={tableData}
              actions={actions}
              template={v}
              onRowDoubleClick={onRowDoubleClick}
              dataKey={dataKey}
              dropdownMenuCallback={handleSetContextMenuData}
            />
          </Column>
        );
      });
    }
    return undefined;
  }, [
    actions,
    handleSetContextMenuData,
    tableData,
    onRowDoubleClick,
    tableOnColumnResizeCallback,
    tableIsResizable,
    tableTemplate,
  ]);

  const renderLoading = React.useCallback(() => tableLoader, [tableLoader]);

  return (
    tableTemplate && (
      <>
        <Table
          translate3d={false}
          renderLoading={tableLoader ? renderLoading : undefined}
          bordered={bordered}
          id="ui-rsuite-table"
          data={tableData}
          height={tableBodyHeight}
          headerHeight={tableHeaderHeight}
          rowHeight={tableRowHeight}
          cellBordered={cellBordered}
          locale={{ emptyMessage: tableEmptyMessage, loading: tableLoadingMessage }}
          sortColumn={sortColumn}
          sortType={sortType}
          onRowClick={onRowClick}
          loading={tableLoading}
          onSortColumn={handleSetSortingValue}
          virtualized={tableVirtualized}
          onRowContextMenu={handleSetContextMenuData}
          shouldUpdateScroll={false}
          rowKey={customId || 'id'}
          autoHeight={tableIsAutoHeight}
        >
          {memoizedTableColumns}
        </Table>
        <div
          className="ui-rsuite-table__context-menu menu transition"
          style={contextMenuData && contextMenuData.menuStyle}
          ref={contextMenuRef}
        >
          {renderContextMenu}
        </div>
      </>
    )
  );
}

export default React.memo(UIRsuiteTableBody);
