import React from 'react';
import '../../SettingsPage.scss';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import actions from '../../../../redux/actions/actions';
import UIInput from '../../../../components/UIInput/UIInput';
import UILoader from '../../../../components/UILoader/UILoader';
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
    settingsStoreSetSubSection,
  } = props;

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
      Object.keys(main).map((v) => {
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

  return (
    <div className="settings-page__main-tab">
      {loadingMainSettings && <UILoader type="--google" dimmed />}
      {!loadingMainSettings && main && (
        <>
          <div className="input-block">
            {renderInputs}
          </div>
          <div className="controls">
            <Button
              content="Сохранить основные настройки"
              icon="check"
              labelPosition="left"
              circular
              primary
              onClick={handleSaveChanges}
              loading={updatingMainSettings}
            />
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
