import React from 'react';
import '../../SettingsPage.scss';
import { connect } from 'react-redux';
import actions from '../../../../redux/actions/actions';
import RecallItem from './RecallItem';
import { Button } from "semantic-ui-react";

function RecallTab(props) {
  const {
    recall,
    updatingRecallSettings,
    settingsStoreUpdateRecall,
    settingsStoreChangeRecallItem,
  } = props;

  const handleChangeValue = React.useCallback((id, editName, editValue) => {
    settingsStoreChangeRecallItem(id, {
      [editName]: editValue,
    });
  }, [settingsStoreChangeRecallItem]);

  const handleSaveChanges = React.useCallback(() => {
    settingsStoreUpdateRecall(recall);
  }, [recall, settingsStoreUpdateRecall]);

  return (
    <div className="settings-page__recall-tab">
      <div className="settings-page__input-block">
        {
          recall.map((v) => (
            <RecallItem key={v.EventCode} data={v} callback={handleChangeValue} />
          ))
        }
      </div>
      <div className="controls">
        <Button
          content="Сохранить настройки перезвона"
          icon="check"
          labelPosition="left"
          positive
          onClick={handleSaveChanges}
          loading={updatingRecallSettings}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  recall: state.settingsStore.recall,
  updatingRecallSettings: state.settingsStore.updatingRecallSettings,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(RecallTab);
