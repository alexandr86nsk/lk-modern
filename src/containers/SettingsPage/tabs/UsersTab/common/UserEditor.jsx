import React from 'react';
import { connect } from 'react-redux';
import actions from '../../../../../redux/actions/actions';
import UILoader from '../../../../../components/UILoader/UILoader';
import UIElementTitle from '../../../../../components/UIElementTitle/UIElementTitle';
import UIAnimateHeightBlock from '../../../../../components/UIAnimateHeightBlock/UIAnimateHeightBlock';

function UserEditor(props) {
  const {
    id,
    userInfoLoading,
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
              body={<div>a</div>}
            />
            <UIAnimateHeightBlock
              title="Паспортные данные"
              body={<div>b</div>}
            />
            <UIAnimateHeightBlock
              title="Банковские реквизиты"
              body={<div>c</div>}
            />
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  userInfoLoading: state.settingsStore.userInfoLoading,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(UserEditor);
