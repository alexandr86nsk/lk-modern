import React from 'react';
import '../../SettingsPage.scss';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import uuid from 'uuid';
import actions from '../../../../redux/actions/actions';
import UITable from '../../../../components/UITable/UITable';
import { queuePhoneTableHeader, queuePhoneItem } from './settings';
import AddItemBody from './AddItemBody';

function QueuePhoneTab(props) {
  const {
    queuePhone,
    updatingQueuePhoneSettings,
    settingsStoreUpdateQueuePhone,
    settingsStoreChangeQueuePhoneItem,
    modalStoreSetSection,
    settingsStoreSetSection,
    queuePhoneTableSearchString,
    queuePhoneControlTypes,
  } = props;

  /*const handleSaveChanges = React.useCallback(() => {
    settingsStoreUpdateQueuePhone(queuePhone);
  }, [queuePhone, settingsStoreUpdateQueuePhone]);*/

  const editedQueuePhoneItem = React.useMemo(() => queuePhoneItem.map((v) => {
    if (v.id === 5) {
      return {
        ...v,
        options: queuePhoneControlTypes,
      };
    }
    return v;
  }), [queuePhoneControlTypes]);

  const handleHideEditModal = React.useCallback((value) => {
    settingsStoreUpdateQueuePhone(value)
    // settingsStoreChangeQueuePhoneItem(value);
  }, [settingsStoreUpdateQueuePhone]);

  const handleEdit = React.useCallback((value) => {
    modalStoreSetSection({
      show: true,
      tempData: value || {
        Id: uuid.v4(),
        QueuePhone: null,
        QueueLimitCoefficient: null,
        QueueLimitCoefficientPerOperatorMax: null,
        QueueLimitCoefficientPerOperatorMin: null,
        CalcQueueLimitCoefficient: null,
        DelayIntervalSec: null,
        LastCheckQueueMembers: null,
        CheckIntervalQueueMembers: null,
        ControlType: null,
        Work: null,
        AcceptPercentLostCalls: null,
      },
      outputBody: {
        title: value ? 'Редактирование настройки' : 'Добавление настройки',
        body: <AddItemBody template={editedQueuePhoneItem} />,
        buttons: {
          positive: value ? 'Сохранить' : 'Добавить',
          negative: 'Отмена',
        },
        type: 'medium',
      },
      requiredFields: [
        {
          name: 'QueueLimitCoefficient',
          type: 'required',
        },
        {
          name: 'QueueLimitCoefficientPerOperatorMax',
          type: 'required',
        },
        {
          name: 'QueueLimitCoefficientPerOperatorMin',
          type: 'required',
        },
        {
          name: 'ControlType',
          type: 'required',
        },
        {
          name: 'Work',
          type: 'required',
        },
        {
          name: 'AcceptPercentLostCalls',
          type: 'required',
        },
      ],
      callback: handleHideEditModal,
    });
  }, [handleHideEditModal, modalStoreSetSection, editedQueuePhoneItem]);

  const handleSearch = React.useCallback((value) => {
    settingsStoreSetSection({ queuePhoneTableSearchString: value });
  }, [settingsStoreSetSection]);

  const editedQueuePhoneTableHeader = React.useMemo(() => queuePhoneTableHeader.map((v) => {
    if (v.id === 5) {
      return {
        ...v,
        options: queuePhoneControlTypes,
      };
    }
    return v;
  }), [queuePhoneControlTypes]);

  return (
    <div className="settings-page__queue-phone-tab">
      <UITable
        header={editedQueuePhoneTableHeader}
        data={queuePhone}
        pagination
        empty="Список контактов пуст"
        selectable
        sortable
        actions={{
          edit: handleEdit,
          cellDoubleClick: handleEdit,
        }}
        search
        searchString={queuePhoneTableSearchString}
        searchCallback={handleSearch}
      />
     {/* <div className="controls">
        <Button
          content="Сохранить настройки очереди"
          icon="check"
          labelPosition="left"
          positive
          onClick={handleSaveChanges}
          loading={updatingQueuePhoneSettings}
        />
      </div>*/}
    </div>
  );
}

const mapStateToProps = (state) => ({
  queuePhone: state.settingsStore.queuePhone,
  updatingQueuePhoneSettings: state.settingsStore.updatingQueuePhoneSettings,
  queuePhoneTableSearchString: state.settingsStore.queuePhoneTableSearchString,
  queuePhoneControlTypes: state.settingsStore.queuePhoneControlTypes,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(QueuePhoneTab);
