import React from 'react';
import { Table } from 'semantic-ui-react';
import UISemanticCheckbox from '../../../../components/UISemanticCheckbox/UISemanticCheckbox';

const CompletionCodesItem = (props) => {
  const {
    data,
    callback,
  } = props || {};

  const {
    name,
    rpc,
    cr,
    closure,
    abandon,
    dontCall,
  } = data || {};

  const handleChangeValue = React.useCallback((editName, editValue) => {
    if (callback) {
      callback({
        ...data,
        [editName]: editValue,
      });
    }
  }, [data, callback]);

  return (
    <Table.Row>
      <Table.Cell>{name}</Table.Cell>
      <Table.Cell>
        <div className="table__checkbox-wrapper">
          <UISemanticCheckbox
            data={rpc}
            name="rpc"
            radio
            callback={handleChangeValue}
          />
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="table__checkbox-wrapper">
          <UISemanticCheckbox
            data={cr}
            name="cr"
            radio
            callback={handleChangeValue}
          />
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="table__checkbox-wrapper">
          <UISemanticCheckbox
            data={closure}
            name="closure"
            radio
            callback={handleChangeValue}
          />
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="table__checkbox-wrapper">
          <UISemanticCheckbox
            data={abandon}
            name="abandon"
            radio
            callback={handleChangeValue}
          />
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="table__checkbox-wrapper">
          <UISemanticCheckbox
            data={dontCall}
            name="dontCall"
            radio
            callback={handleChangeValue}
          />
        </div>
      </Table.Cell>
    </Table.Row>
  );
};

export default React.memo(CompletionCodesItem);
