import React from 'react';
import { Table } from 'semantic-ui-react';
import * as moment from 'moment';
import UIFilePicker from '../UIFilePicker/UIFilePicker';
import UIInput from '../UIInput/UIInput';


function UITableCell(props) {
  const {
    data = [],
    keys = [],
    list = [],
    actions = {},
    selectable = false,
  } = props;

  moment.locale('ru');

  const handleCellClick = React.useCallback(() => {
    if (selectable && actions.cellClick) {
      actions.cellClick(data);
    }
  }, [actions, data, selectable]);

  const handleCellDoubleClick = React.useCallback(() => {
    if (selectable && actions.cellDoubleClick) {
      actions.cellDoubleClick(data);
    }
  }, [actions, data, selectable]);

  const handleAddFiles = React.useCallback((files) => {
    actions.upload(data, files);
  }, [actions, data]);

  const renderCell = React.useMemo(
    () => keys.map((v) => {
      switch (v.type) {
        case 'date':
          return (
            <Table.Cell
              key={v.id}
              onClick={handleCellClick}
              onDoubleClick={handleCellDoubleClick}
              collapsing={v.collapsing}
            >
              {data[v.value] ? moment(data[v.value]).format(v.dateFormat || 'DD.MM.YYYY HH:mm') : ''}
            </Table.Cell>
          );
        case 'isEmpty':
          return (
            <Table.Cell
              key={v.id}
              onClick={handleCellClick}
              onDoubleClick={handleCellDoubleClick}
              collapsing={v.collapsing}
            >
              {data[v.value] ? data[v.value] : v.emptyMessage}
            </Table.Cell>
          );
        case 'boolean':
          return (
            <Table.Cell
              key={v.id}
              onClick={handleCellClick}
              onDoubleClick={handleCellDoubleClick}
              collapsing={v.collapsing}
            >
              {data[v.value] ? v.trueMessage : v.falseMessage}
            </Table.Cell>
          );
        case 'options':
          return (
            <Table.Cell
              key={v.id}
              onClick={handleCellClick}
              onDoubleClick={handleCellDoubleClick}
              collapsing={v.collapsing}
            >
              {v.options[data[v.value]] && v.options[data[v.value]] ? v.options[data[v.value]] : ''}
            </Table.Cell>
          );
        case 'options-select':
          return (
            <Table.Cell
              key={v.id}
              onClick={handleCellClick}
              onDoubleClick={handleCellDoubleClick}
              collapsing={v.collapsing}
            >
              {v.options.filter((w) => w.value === data[v.value])[0] ? v.options.filter((w) => w.value === data[v.value])[0].label : ''}
            </Table.Cell>
          );
        case 'input':
          return (
            <Table.Cell
              key={v.id}
              onClick={handleCellClick}
              onDoubleClick={handleCellDoubleClick}
              collapsing={v.collapsing}
            >
              <UIInput
                name={data.subName}
                data={v.data[data.subName]}
                callback={v.callback}
                {...data.validation}
              />
            </Table.Cell>
          );
        case 'card':
          return (
            <Table.Cell key={v.id} collapsing={v.collapsing}>
              <div>
                {v.data[data.subName] && (data.type === 'date')
                  ? moment(v.data[data.subName]).format(data.dateFormat || 'DD.MM.YYYY HH:mm')
                  : v.data[data.subName]}
              </div>
            </Table.Cell>
          );
        case 'controls':
          return (
            <Table.Cell collapsing selectable key={v.id}>
              <div className="ui-table__row-controls-block">
                {v.controls.map((el) => {
                  if (el.action === 'upload') {
                    return (
                      <UIFilePicker
                        key={el.id}
                        callback={handleAddFiles}
                      />
                    );
                  }
                  return (
                    <div
                      role="presentation"
                      title={el.title}
                      key={el.title}
                      onClick={() => actions[el.action](data)}
                    >
                      {el.icon}
                    </div>
                  );
                })}
              </div>
            </Table.Cell>
          );
        case 'control-options':
          return (
            <Table.Cell collapsing selectable key={v.id}>
              <div className="ui-table__row-controls-block">
                {v.controls.map((el) => {
                  if (!el.showOptions.length
                    || (el.showOptions.includes(data[el.showValue]))
                  ) {
                    if (el.action === 'upload') {
                      return (
                        <UIFilePicker
                          key={el.id}
                          title={el.title}
                          callback={handleAddFiles}
                        />
                      );
                    }
                    return (
                      <div
                        role="presentation"
                        title={el.title}
                        key={el.title}
                        onClick={() => actions[el.action](data)}
                      >
                        {el.icon}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </Table.Cell>
          );
        case 'component':
          return (
            <Table.Cell
              key={v.id}
              onClick={handleCellClick}
              onDoubleClick={handleCellDoubleClick}
              collapsing={v.collapsing}
            >
              {v.component(data, list)}
            </Table.Cell>
          );
        case 'component-controls':
          return (
            <Table.Cell
              key={v.id}
              collapsing={v.collapsing}
              selectable={v.selectable && !!data[v.value]}
            >
              {v.component(data, list)}
            </Table.Cell>
          );
        case 'actions':
          return (
            <Table.Cell
              key={v.id}
              onClick={handleCellClick}
              onDoubleClick={handleCellDoubleClick}
              collapsing={v.collapsing}
            >
              {v.component(data, actions)}
            </Table.Cell>
          );
        case 'inline':
          return (
            <Table.Cell
              key={v.id}
              onClick={handleCellClick}
              onDoubleClick={handleCellDoubleClick}
              collapsing={v.collapsing}
            >
              {v.value.map((w) => ` ${data[w] || ''}`)}
            </Table.Cell>
          );
        default:
          return (
            <Table.Cell
              key={v.id}
              onClick={handleCellClick}
              onDoubleClick={handleCellDoubleClick}
              collapsing={v.collapsing}
            >
              {data[v.value]}
            </Table.Cell>
          );
      }
    }), [actions, data, handleAddFiles, handleCellClick, handleCellDoubleClick, keys, list],
  );

  return (
    <>
      {renderCell}
    </>
  );
}

export default React.memo(UITableCell);
