import React from 'react';
import { Cell } from 'rsuite-table';
import * as moment from 'moment';
import { Button, Icon } from 'semantic-ui-react';
import MoreIcon from './more-icon.svg';
import UIRsuiteTableFilePicker from '../common/UIRsuiteTableFilePicker/UIRsuiteTableFilePicker';

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

  const handleRowDoubleClick = React.useCallback((e) => {
    console.log('e.target', e.target);
    console.log('cellRef.current', cellRef.current);
    if (e.target === cellRef.current) {
      if (onRowDoubleClick && type !== 'actions') {
        onRowDoubleClick(rowData);
      }
    }
  }, [type, rowData, onRowDoubleClick]);

  const handleDropdownMenuClick = React.useCallback((e) => {
    console.log('eD', e);
    e.preventDefault();
    e.stopPropagation();
    if (dropdownMenuCallback) {
      dropdownMenuCallback(rowData, e);
    }
  }, [rowData, dropdownMenuCallback]);

  const handleActionClick = React.useCallback((e, fn) => {
    console.log('eA', e);
    e.preventDefault();
    e.stopPropagation();
    fn(rowData);
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
              action,
              icon,
              title,
              upload,
              fileTypes,
              hideTitle,
              color,
            } = v || {};
            let menuItem;
            if (upload) {
              menuItem = (
                <UIRsuiteTableFilePicker
                  key={id}
                  title={title}
                  fileTypes={fileTypes}
                  icon={icon}
                  isButton
                  hideTitle={hideTitle}
                  callback={(files) => action(rowData, files)}
                />
              );
            } else {
              menuItem = (hideTitle
                ? (
                  <Button
                    key={id}
                    circular
                    color={color}
                    title={title}
                    icon={icon}
                    onClick={(e) => handleActionClick(e, action)}
                  />
                )
                : (
                  <Button
                    key={id}
                    circular
                    color={color}
                    title={title}
                    onClick={(e) => handleActionClick(e, action)}
                  >
                    <Icon name={icon} />
                    {title}
                  </Button>
                )
              );
            }
            items.push(menuItem);
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
  ]);

  return (
    <div
      ref={cellRef}
      onDoubleClick={handleRowDoubleClick}
      className={type ? `ui-rsuite-table__${type}` : ''}
    >
      <Cell
        {...otherProps}
        // style={type === 'actions' ? { textAlign: 'center' } : {}}
      >
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
