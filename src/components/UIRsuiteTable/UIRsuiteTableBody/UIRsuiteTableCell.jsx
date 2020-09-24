import React from 'react';
import { Cell } from 'rsuite-table';
import * as moment from 'moment';
import MoreIcon from './more-icon.svg';
import UIRsuiteTableMenuItem from './UIRsuiteTableMenuItem';

const UIRsuiteTableCell = (props) => {
  const {
    rowData,
    tableData,
    dataKey,
    onRowDoubleClick,
    template,
    actions,
    dropdownMenuCallback,
    ...otherProps
  } = props || {};

  const {
    type,
    component,
    dateFormat,
  } = template || {};

  const cellRef = React.useRef(null);

  const handleRowDoubleClick = React.useCallback(() => {
    if (onRowDoubleClick) {
      onRowDoubleClick(rowData);
    }
  }, [rowData, onRowDoubleClick]);

  const handleDropdownMenuClick = React.useCallback((e) => {
    if (dropdownMenuCallback) {
      dropdownMenuCallback(rowData, e);
    }
  }, [rowData, dropdownMenuCallback]);

  const handleActionClick = React.useCallback((fn) => {
    fn(rowData);
  }, [rowData]);

  const handleUploadClick = React.useCallback((fn, files) => {
    fn(rowData, files);
  }, [rowData]);

  const memoizedData = React.useMemo(() => {
    const items = [];
    switch (type) {
      case 'component':
        if (component) {
          return {
            data: component(rowData, tableData),
            title: '',
          };
        }
        return rowData[dataKey];
      case 'actions':
        return {
          data: (
            <div
              role="presentation"
              className="ui-rsuite-table__icon"
              onClick={handleDropdownMenuClick}
            >
              <MoreIcon />
            </div>
          ),
          title: '',
        };
      case 'icon-actions':
        if (actions && Array.isArray(actions)) {
          const filteredCustomActions = actions.filter((v) => !v.showCondition
            || (v.showCondition && v.showCondition(rowData)));
          filteredCustomActions.forEach((v) => {
            const {
              id,
            } = v || {};
            items.push(
              <UIRsuiteTableMenuItem
                key={id}
                item={v}
                callback={handleActionClick}
                uploadCallback={handleUploadClick}
                isButton
              />,
            );
          });
        }

        return { data: items, title: '' };
      case 'date':
        moment.locale('ru');
        return {
          data: rowData[dataKey] ? moment(rowData[dataKey]).format(dateFormat || 'DD.MM.YYYY HH:mm') : '',
          title: rowData[dataKey] ? moment(rowData[dataKey]).format(dateFormat || 'DD.MM.YYYY HH:mm') : '',
        };
      default:
        return {
          data: rowData[dataKey],
          title: rowData[dataKey],
        };
    }
  }, [
    actions,
    handleDropdownMenuClick,
    dateFormat,
    tableData,
    component,
    type,
    rowData,
    dataKey,
    handleActionClick,
    handleUploadClick,
  ]);

  return (
    <div
      ref={cellRef}
      onDoubleClick={handleRowDoubleClick}
      className={type ? `ui-rsuite-table__cell${type ? ` --${type}` : ''}` : ''}
    >
      <Cell {...otherProps}>
        <div
          className="ui-rsuite-table__cell-data ellipsis-element"
          title={typeof rowData[dataKey] === 'boolean' ? '' : memoizedData.title}
        >
          {memoizedData.data}
        </div>
      </Cell>
    </div>
  );
};

export default React.memo(UIRsuiteTableCell);
