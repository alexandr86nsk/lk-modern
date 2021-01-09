import React from 'react';
import '../../SettingsPage.scss';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';
import actions from '../../../../redux/actions/actions';
import UILoader from '../../../../components/Loader';
import UIMissingData from '../../../../components/UIMissingData/UIMissingData';
import CompletionCodesItem from './CompletionCodesItem';
import useResizeObserver from '../../../../components/UICustomHooks/useResizeObserver/useResizeObserver';

function CompletionCodes(props) {
  const {
    completionCodes,
    loadingCompletionCodes,
    updatingCompletionCode,
    settingsStoreGetCompletionCodes,
    settingsStoreGetCompletionCodesCancel,
    settingsStoreUpdateCompletionCode,
    settingsStoreUpdateCompletionCodeCancel,
  } = props || {};

  const handleChangeValue = React.useCallback((value) => {
    settingsStoreUpdateCompletionCode(value);
  }, [settingsStoreUpdateCompletionCode]);

  const tableRef = React.useRef(null);

  const { width: tableWidth } = useResizeObserver(tableRef);

  const renderRows = React.useMemo(() => {
    if (completionCodes && Array.isArray(completionCodes)) {
      return completionCodes.map((v) => (
        <CompletionCodesItem
          key={v.id}
          data={v}
          callback={handleChangeValue}
        />
      ));
    }
    return null;
  }, [completionCodes, handleChangeValue]);

  React.useEffect(() => {
    settingsStoreGetCompletionCodes();
  }, [settingsStoreGetCompletionCodes]);

  React.useEffect(() => () => {
    settingsStoreGetCompletionCodesCancel();
    settingsStoreUpdateCompletionCodeCancel();
  }, [
    settingsStoreGetCompletionCodesCancel,
    settingsStoreUpdateCompletionCodeCancel,
  ]);

  return (
    <div className="settings-page__completion-codes-tab tab" ref={tableRef}>
      {(loadingCompletionCodes || updatingCompletionCode) && <UILoader type="--google" dimmed />}
      {!loadingCompletionCodes && completionCodes && (
      <div className="table">
        <Table selectable celled fixed size="small" unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Наименование из бита</Table.HeaderCell>
              <Table.HeaderCell width={tableWidth < 1250 ? 2 : 1}>Должник</Table.HeaderCell>
              <Table.HeaderCell width={tableWidth < 1250 ? 2 : 1}>Понятая трубка</Table.HeaderCell>
              <Table.HeaderCell width={tableWidth < 1250 ? 2 : 1}>Обещание</Table.HeaderCell>
              <Table.HeaderCell width={tableWidth < 1250 ? 2 : 1}>Потерянные</Table.HeaderCell>
              <Table.HeaderCell width={tableWidth < 1250 ? 2 : 1}>Не звонить</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {renderRows}
          </Table.Body>
        </Table>
      </div>
      )}
      {!loadingCompletionCodes && !completionCodes && <UIMissingData />}
    </div>
  );
}

const mapStateToProps = (state) => ({
  completionCodes: state.settingsStore.completionCodes,
  loadingCompletionCodes: state.settingsStore.loadingCompletionCodes,
  updatingCompletionCode: state.settingsStore.updatingCompletionCode,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(CompletionCodes);
