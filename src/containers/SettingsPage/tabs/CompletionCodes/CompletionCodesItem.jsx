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
            callback={handleChangeValue}
          />
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="table__checkbox-wrapper">
          <UISemanticCheckbox
            data={cr}
            name="cr"
            callback={handleChangeValue}
          />
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="table__checkbox-wrapper">
          <UISemanticCheckbox
            data={closure}
            name="closure"
            callback={handleChangeValue}
          />
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="table__checkbox-wrapper">
          <UISemanticCheckbox
            data={abandon}
            name="abandon"
            callback={handleChangeValue}
          />
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="table__checkbox-wrapper">
          <UISemanticCheckbox
            data={dontCall}
            name="dontCall"
            callback={handleChangeValue}
          />
        </div>
      </Table.Cell>
    </Table.Row>
  );
};

export default React.memo(CompletionCodesItem);
