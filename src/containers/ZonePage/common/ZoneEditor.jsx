import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import actions from '../../../redux/actions/actions';
import UILoader from '../../../components/UILoader/UILoader';
import UIAnimateHeightBlock from '../../../components/UIAnimateHeightBlock/UIAnimateHeightBlock';
import formGenerator from '../../../components/utilities/formGenerator';
import { userInfoMainTemplate } from '../settings';

function ZoneEditor(props) {
  const {
    id,
    userInfo,
    userInfoLoading,
    settingsStoreSetUserInfoSection,
    settingsStoreGetUserInfo,
    settingsStoreGetUserInfoCancel,
    settingsStoreSaveUser,
    settingsStoreSaveUserCancel,
    settingsStoreClearUserInfo,
  } = props;

  React.useEffect(() => {
    if (id) {
      settingsStoreGetUserInfo(id);
    }
  }, [id, settingsStoreGetUserInfo]);

  React.useEffect(() => () => {
    settingsStoreGetUserInfoCancel();
    settingsStoreSaveUserCancel();
    settingsStoreClearUserInfo();
  }, [
    settingsStoreClearUserInfo,
    settingsStoreGetUserInfoCancel,
    settingsStoreSaveUserCancel,
  ]);

  const handleSaveUser = React.useCallback(() => {
    settingsStoreSaveUser(userInfo);
  }, [userInfo, settingsStoreSaveUser]);

  const handleChangeValue = React.useCallback((editName, editValue) => {
    settingsStoreSetUserInfoSection({
      [editName]: editValue,
    });
  }, [settingsStoreSetUserInfoSection]);

  const mainBlock = React.useMemo(
    () => formGenerator(userInfoMainTemplate, userInfo, handleChangeValue),
    [userInfo, handleChangeValue],
  );

  return (
    <div className="zone-page__add-zone-popup add-item-popup">
      <div className="add-item-popup__title">
        <span className="ellipsis-element">{id ? 'Редактирование пользователя' : 'Добавление пользователя'}</span>
      </div>
      <div className="add-item-popup__body">
        {userInfoLoading && (
          <div className="add-item-popup__loader">
            <UILoader text="Загрузка данных..." />
          </div>
        )}
        {!userInfoLoading && (
        <div className="add-item-popup__table">
          <UIAnimateHeightBlock
            title="Основные данные"
            body={mainBlock}
            blockName="main"
          />
        </div>
        )}
      </div>
      <div className="add-item-popup__btn">
        <Button
          circular
          positive
          size="small"
          disabled={userInfoLoading}
          onClick={handleSaveUser}
        >
          <Icon name="check" />
          {id ? 'Сохранить' : 'Добавить'}
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  userInfoLoading: state.settingsStore.userInfoLoading,
  userInfo: state.settingsStore.userInfo,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(ZoneEditor);
