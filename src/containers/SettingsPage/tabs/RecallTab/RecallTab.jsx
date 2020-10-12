import React from 'react';
import '../../SettingsPage.scss';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import actions from '../../../../redux/actions/actions';
import RecallItem from './RecallItem';
import UILoader from '../../../../components/UILoader/UILoader';
import UIMissingData from '../../../../components/UIMissingData/UIMissingData';

function RecallTab(props) {
  const {
    recall,
    updatingRecallSettings,
    loadingRecallSettings,
    settingsStoreUpdateRecall,
    settingsStoreUpdateRecallCancel,
    settingsStoreChangeRecallItem,
    settingsStoreGetRecall,
    settingsStoreGetRecallCancel,
  } = props || {};

  const handleChangeValue = React.useCallback((id, editName, editValue) => {
    settingsStoreChangeRecallItem(id, {
      [editName]: editValue,
    });
  }, [settingsStoreChangeRecallItem]);

  const handleSaveChanges = React.useCallback(() => {
    settingsStoreUpdateRecall(recall);
  }, [recall, settingsStoreUpdateRecall]);

  const renderItems = React.useMemo(() => {
    if (recall && Array.isArray(recall)) {
      return recall.map((v) => {
        const { EventCode } = v || {};
        return <RecallItem key={EventCode} data={v} callback={handleChangeValue} />;
      });
    }
    return null;
  }, [recall, handleChangeValue]);

  React.useEffect(() => {
    settingsStoreGetRecall();
  }, [settingsStoreGetRecall]);

  React.useEffect(() => () => {
    settingsStoreGetRecallCancel();
    settingsStoreUpdateRecallCancel();
  }, [settingsStoreGetRecallCancel, settingsStoreUpdateRecallCancel]);

  return (
    <div className="settings-page__recall-tab tab">
      {loadingRecallSettings && <UILoader type="--google" dimmed />}
      {!loadingRecallSettings && recall && (
        <>
          <div className="input-block">
            {renderItems}
          </div>
          <div className="controls">
            <Button
              circular
              primary
              size="tiny"
              loading={updatingRecallSettings}
              onClick={handleSaveChanges}
              title="Сохранить настройки перезвона"
            >
              <Icon name="check" />
              Сохранить
            </Button>
          </div>
        </>
      )}
      {!loadingRecallSettings && !recall && <UIMissingData />}
    </div>
  );
}

const mapStateToProps = (state) => ({
  recall: state.settingsStore.recall,
  updatingRecallSettings: state.settingsStore.updatingRecallSettings,
  loadingRecallSettings: state.settingsStore.loadingRecallSettings,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(RecallTab);
