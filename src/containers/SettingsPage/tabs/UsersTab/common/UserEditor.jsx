import React from 'react';
import { connect } from 'react-redux';
import actions from '../../../../../redux/actions/actions';
import UILoader from '../../../../../components/UILoader/UILoader';
import UIElementTitle from '../../../../../components/UIElementTitle/UIElementTitle';
import UIAnimateHeightBlock from '../../../../../components/UIAnimateHeightBlock/UIAnimateHeightBlock';
import formGenerator from '../../../../../components/utilities/formGenerator';
import { userInfoMainTemplate } from '../settings';

function UserEditor(props) {
  const {
    id,
    userInfo,
    userInfoLoading,
    settingStoreSetUserInfoSection,
    settingsStoreGetUserInfo,
    settingsStoreGetUserInfoCancel,
    settingsStoreSaveUserCancel,
  } = props;

  React.useEffect(() => {
    if (id) {
      settingsStoreGetUserInfo(id);
    }
  }, [id, settingsStoreGetUserInfo]);

  React.useEffect(() => () => {
    settingsStoreGetUserInfoCancel();
    settingsStoreSaveUserCancel();
  }, [
    settingsStoreGetUserInfoCancel,
    settingsStoreSaveUserCancel,
  ]);

  const handleChangeValue = React.useCallback((editName, editValue) => {
    settingStoreSetUserInfoSection({
      [editName]: editValue,
    });
  }, [settingStoreSetUserInfoSection]);

  const mainBlock = React.useMemo(
    () => formGenerator(userInfoMainTemplate, userInfo, handleChangeValue),
    [userInfo, handleChangeValue],
  );

  return (
    <div className="settings-page__add-user-popup">
      <UIElementTitle title={id ? 'Редактирование пользователя' : 'Добавление пользователя'} />
      <div className="add-user-popup__body">
        {userInfoLoading && (
          <div className="add-user-popup__loader">
            <UILoader text="Загрузка данных..." />
          </div>
        )}
        {!userInfoLoading && (
          <div className="add-user-popup__table">
            <UIAnimateHeightBlock
              title="Основные"
              body={mainBlock}
              blockName="main"
            />
            <UIAnimateHeightBlock
              title="Паспортные данные"
              body={<div>b</div>}
              blockName="passport"
            />
            <UIAnimateHeightBlock
              title="Банковские реквизиты"
              body={<div>c</div>}
              blockName="bank"
            />
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  userInfoLoading: state.settingsStore.userInfoLoading,
  userInfo: state.settingsStore.userInfo,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(UserEditor);
