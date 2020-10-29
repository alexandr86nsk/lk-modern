import React from 'react';
import '../../SettingsPage.scss';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import actions from '../../../../redux/actions/actions';
import UIInput from '../../../../components/UIInput/UIInput';
import UILoader from '../../../../components/UILoader';
import UIMissingData from '../../../../components/UIMissingData/UIMissingData';

const options = {
  SocketAddressAMI: 'SocketAddressAMI',
  SocketPortAMI: 'SocketPortAMI',
  SocketLogin: 'SocketLogin',
  SocketPassword: 'SocketPassword',
  /*  TimerInterval: 'TimerInterval',
  QueueLimitCoefficient: 'QueueLimitCoefficient',
  SuccessCoefficient: 'SuccessCoefficient',
  ChanelQueue: 'ChanelQueue', */
  QueueName: 'QueueName',
  QueueContext: 'QueueContext',
  /* QueuePhone: 'QueuePhone',
  MaxRetryCount: 'MaxRetryCount',
  StartCall: 'StartCall',
  StopCall: 'StopCall', */
  StatisticCalcPeriod: 'StatisticCalcPeriod',
  /* OutgoingGroupNumber: 'Тех.номер', */
};

function MainTab(props) {
  const {
    main,
    updatingMainSettings,
    loadingMainSettings,
    settingsStoreUpdateMain,
    settingsStoreUpdateMainCancel,
    settingsStoreSetSubSection,
    settingsStoreGetMain,
    settingsStoreGetMainCancel,
  } = props || {};

  const handleChangeValue = React.useCallback((editName, editValue) => {
    settingsStoreSetSubSection('main', {
      [editName]: editValue,
    });
  }, [settingsStoreSetSubSection]);

  const handleSaveChanges = React.useCallback(() => {
    settingsStoreUpdateMain(main);
  }, [main, settingsStoreUpdateMain]);

  const renderInputs = React.useMemo(() => {
    if (main) {
      return Object.keys(main).map((v) => {
        if (options[v]) {
          return (
            <UIInput
              type="--style-1c --transparent"
              key={options[v]}
              title={options[v]}
              data={main[v]}
              name={v}
              callback={handleChangeValue}
            />
          );
        }
        return null;
      });
    }
    return null;
  }, [main, handleChangeValue]);

  React.useEffect(() => {
    settingsStoreGetMain();
  }, [settingsStoreGetMain]);

  React.useEffect(() => () => {
    settingsStoreGetMainCancel();
    settingsStoreUpdateMainCancel();
  }, [settingsStoreGetMainCancel, settingsStoreUpdateMainCancel]);

  return (
    <div className="settings-page__main-tab tab">
      {loadingMainSettings && <UILoader title="Загрузка" type="block-wave" dimmed />}
      {!loadingMainSettings && main && (
        <>
          <div className="input-block">
            {renderInputs}
          </div>
          <div className="controls">
            <Button
              circular
              primary
              size="tiny"
              loading={updatingMainSettings}
              onClick={handleSaveChanges}
              title="Сохранить основные настройки"
            >
              <Icon name="check" />
              Сохранить
            </Button>
          </div>
        </>
      )}
      {!loadingMainSettings && !main && <UIMissingData />}
    </div>
  );
}

const mapStateToProps = (state) => ({
  main: state.settingsStore.main,
  updatingMainSettings: state.settingsStore.updatingMainSettings,
  loadingMainSettings: state.settingsStore.loadingMainSettings,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(MainTab);
