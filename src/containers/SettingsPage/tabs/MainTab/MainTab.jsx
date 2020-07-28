import React from 'react';
import '../../SettingsPage.scss';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import actions from '../../../../redux/actions/actions';
import UIInput from '../../../../components/UIInputV2/UIInput';

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

  const renderInputs = React.useMemo(() => Object.keys(main).map((v) => {
    if (options[v]) {
      return (
        <UIInput
          type="--style-1c"
          key={options[v]}
          title={options[v]}
          data={main[v]}
          name={v}
          callback={handleChangeValue}
        />
      );
    }
    return null;
  }), [main, handleChangeValue]);

  return (
    <div className="settings-page__main-tab">
      <div className="input-block">
        {renderInputs}
      </div>
      <div className="controls">
        <Button
          content="Сохранить основные настройки"
          icon="check"
          labelPosition="left"
          positive
          onClick={handleSaveChanges}
          loading={updatingMainSettings}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  main: state.settingsStore.main,
  updatingMainSettings: state.settingsStore.updatingMainSettings,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(MainTab);
