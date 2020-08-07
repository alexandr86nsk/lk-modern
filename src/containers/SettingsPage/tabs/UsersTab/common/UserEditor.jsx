import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import actions from '../../../../../redux/actions/actions';
import UILoader from '../../../../../components/UILoader/UILoader';
import UIAnimateHeightBlock from '../../../../../components/UIAnimateHeightBlock/UIAnimateHeightBlock';
import formGenerator from '../../../../../components/utilities/formGenerator';
import {
  userInfoBankTemplate,
  userInfoMainTemplate,
  userInfoOtherTemplate,
  userInfoPassportTemplate,
} from '../settings';

function UserEditor(props) {
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
  } = props || {};

  const {
    addressRegistration,
    addressResidence,
    isCompare,
  } = userInfo || {};

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

  const passportBlock = React.useMemo(() => {
    let editedTemplate = userInfoPassportTemplate;
    if (isCompare && userInfoPassportTemplate && Array.isArray(userInfoPassportTemplate)) {
      editedTemplate = userInfoPassportTemplate.map((v) => {
        const { id: blockId, content } = v || {};
        if (blockId === 2) {
          return {
            ...v,
            content: [content[0]],
          };
        }
        return v;
      });
    }
    if (editedTemplate && Array.isArray(editedTemplate)) {
      return editedTemplate.map((v) => {
        const {
          id: blockId,
          title,
          content,
        } = v || {};
        return (
          <div key={blockId} className="add-user-popup__section">
            <div className="add-user-popup__subtitle">{title}</div>
            {formGenerator(content, userInfo, handleChangeValue)}
          </div>
        );
      });
    }
    return null;
  }, [isCompare, userInfo, handleChangeValue]);

  const otherBlock = React.useMemo(
    () => formGenerator(userInfoOtherTemplate, userInfo, handleChangeValue),
    [userInfo, handleChangeValue],
  );

  const bankBlock = React.useMemo(
    () => formGenerator(userInfoBankTemplate, userInfo, handleChangeValue),
    [userInfo, handleChangeValue],
  );

  return (
    <div className="settings-page__add-user-popup">
      <div className="add-user-popup__title">
        <span className="ellipsis-element">{id ? 'Редактирование пользователя' : 'Добавление пользователя'}</span>
      </div>
      <div className="add-user-popup__body">
        {userInfoLoading && (
          <div className="add-user-popup__loader">
            <UILoader text="Загрузка данных..." />
          </div>
        )}
        {!userInfoLoading && (
        <div className="add-user-popup__table">
          <UIAnimateHeightBlock
            title="Основные данные"
            body={mainBlock}
            blockName="main"
          />
          <UIAnimateHeightBlock
            title="Паспортные данные"
            body={passportBlock}
            blockName="passport"
          />
          <UIAnimateHeightBlock
            title="Дополнительная информация"
            body={otherBlock}
            blockName="other"
          />
          <UIAnimateHeightBlock
            title="Банковские реквизиты"
            body={bankBlock}
            blockName="bank"
          />
        </div>
        )}
      </div>
      <div className="add-user-popup__btn">
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

export default connect(mapStateToProps, mapDispatchToProps)(UserEditor);
