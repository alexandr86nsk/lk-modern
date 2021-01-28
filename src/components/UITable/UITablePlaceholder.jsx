import React from 'react';
import { Table } from 'semantic-ui-react';
import UILoader from '../Loader/Loader';

function UITablePlaceholder(props) {
  const { length } = props;

  return (
    <Table.Row>
      <Table.Cell className="ui-table__empty loading" colSpan={length}>
        <UILoader text="Загрузка" size="small" />
      </Table.Cell>
    </Table.Row>
  );
}

export default React.memo(UITablePlaceholder);
