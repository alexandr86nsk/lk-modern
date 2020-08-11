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

const KladrItem = (props) => {
  const {
    name,
    item,
    callback,
  } = props || {};

  const {
    data,
    unrestricted_value: value,
  } = item || {};

  const handleClick = React.useCallback(() => {
    if (callback) {
      callback(name, data);
    }
  }, [callback, name, data]);

  return (
    <li
      role="presentation"
      title={value}
      onClick={handleClick}
    >
      {value}
    </li>
  );
};

function UserEditor(props) {
  const {
    id,
    userInfo,
    userInfoLoading,
    userRoles,
    userRolesLoading,
    addressRegistrationCityNameLoading,
    addressRegistrationStreetNameLoading,
    addressRegistrationCityNameResults,
    addressRegistrationStreetNameResults,
    settingsStoreSetUserInfoSection,
    settingsStoreGetUserInfo,
    settingsStoreGetUserInfoCancel,
    settingsStoreSaveUser,
    settingsStoreClearUserInfo,
    settingsStoreSetUserInfoAddressRegistrationSection,
    settingsStoreSetUserInfoAddressResidenceSection,
    settingsStoreDadataGetAddress,
    settingsStoreDadataGetAddressCancel,
  } = props || {};

  const {
    addressRegistration,
    addressResidence,
    isConcidesPlaceReg,
  } = userInfo || {};

  const {
    cityName: addressRegistrationCityName,
    streetName: addressRegistrationStreetName,
  } = addressRegistration || {};

  const isFirstRun = React.useRef(true);

  React.useEffect(() => {
    if (id) {
      settingsStoreGetUserInfo(id);
    }
  }, [id, settingsStoreGetUserInfo]);

  React.useEffect(() => () => {
    settingsStoreGetUserInfoCancel();
    settingsStoreClearUserInfo();
    settingsStoreDadataGetAddressCancel();
  }, [
    settingsStoreClearUserInfo,
    settingsStoreGetUserInfoCancel,
    settingsStoreDadataGetAddressCancel,
  ]);

  React.useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
    } else if (addressRegistrationCityName) {
      settingsStoreDadataGetAddress({
        id: 'addressRegistrationCityName',
        query: {
          from_bound: { value: 'city' },
          query: addressRegistrationCityName,
          to_bound: { value: 'settlement' },
        },
      });
    } else if (addressRegistrationStreetName) {
      settingsStoreDadataGetAddress({
        id: 'addressRegistrationStreetName',
        query: {
          from_bound: { value: 'street' },
          query: addressRegistrationStreetName,
          to_bound: { value: 'street' },
        },
      });
    }
  }, [
    settingsStoreDadataGetAddress,
    addressRegistrationCityName,
    addressRegistrationStreetName,
  ]);

  const handleSaveUser = React.useCallback(() => {
    let el;
    if (isConcidesPlaceReg) {
      const { addressResidence: ar, ...obj } = userInfo || {};
      el = obj;
    } else {
      el = userInfo;
    }
    settingsStoreSaveUser(el);
  }, [isConcidesPlaceReg, userInfo, settingsStoreSaveUser]);

  const handleChangeValue = React.useCallback((editName, editValue) => {
    settingsStoreSetUserInfoSection({
      [editName]: editValue,
    });
  }, [settingsStoreSetUserInfoSection]);

  const handleChangeAddressRegistrationValue = React.useCallback((editName, editValue) => {
    settingsStoreSetUserInfoAddressRegistrationSection({
      [editName]: editValue,
    });
  }, [settingsStoreSetUserInfoAddressRegistrationSection]);

  const handleChangeAddressResidenceValue = React.useCallback((editName, editValue) => {
    if (editName === 'isConcidesPlaceReg') {
      settingsStoreSetUserInfoSection({
        isConcidesPlaceReg: editValue,
      });
    }
    settingsStoreSetUserInfoAddressResidenceSection({
      [editName]: editValue,
    });
  }, [
    settingsStoreSetUserInfoAddressResidenceSection,
    settingsStoreSetUserInfoSection,
  ]);

  const handleSetDadataValue = React.useCallback((editName, editValue) => {
    if (editName.includes('addressRegistration')) {
      settingsStoreSetUserInfoAddressRegistrationSection({
        [editName]: editValue,
      });
    }
    if (editName === 'addressResCityName') {
      settingsStoreSetUserInfoAddressRegistrationSection({
        [editName]: editValue,
      });
    }
  }, [settingsStoreSetUserInfoAddressRegistrationSection]);

  const mainBlock = React.useMemo(() => {
    const tmp = userInfoMainTemplate.map((v) => {
      const { dataKey, otherProps } = v || {};
      if (dataKey === 'roleID') {
        return {
          ...v,
          options: userRoles,
          otherPros: {
            loading: userRolesLoading,
          },
        };
      }
      if (!id && dataKey === 'password') {
        return {
          ...v,
          otherProps: {
            ...otherProps,
            required: true,
            minLength: 6,
            successFormat: 'Это поле обязательно для заполнения и должно содержать не менее 6 символов',
          },
        };
      }
      return v;
    });
    return formGenerator(tmp, userInfo, handleChangeValue);
  },
  [
    id,
    userRoles,
    userRolesLoading,
    userInfo,
    handleChangeValue,
  ]);

  const passportBlock = React.useMemo(() => {
    let editedTemplate = userInfoPassportTemplate;
    if (isConcidesPlaceReg && userInfoPassportTemplate && Array.isArray(userInfoPassportTemplate)) {
      editedTemplate = userInfoPassportTemplate.map((v) => {
        const { blockKey, content } = v || {};
        if (blockKey === 'addressResidence') {
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
          blockKey,
        } = v || {};
        let templateArr = [];
        if (content && Array.isArray(content)) {
          templateArr = content.map((x) => {
            const {
              dataKey,
              otherProps,
            } = x || {};
            if (dataKey === 'cityName') {
              return {
                ...x,
                otherProps: {
                  ...otherProps,
                  loadingData: addressRegistrationCityNameLoading,
                  customResults: addressRegistrationCityNameResults
                  && Array.isArray(addressRegistrationCityNameResults)
                    ? addressRegistrationCityNameResults.map((w) => {
                      const {
                        data: thisData,
                      } = w || {};
                      const {
                        kladr_id: kladrId,
                      } = thisData || {};
                      return (
                        <KladrItem
                          name="addressRegistrationCityName"
                          key={kladrId}
                          item={w}
                          callback={handleSetDadataValue}
                        />
                      );
                    })
                    : <li>Поиск не дал результатов</li>,
                },
              };
            }
            if (dataKey === 'streetName') {
              return {
                ...x,
                otherProps: {
                  ...otherProps,
                  loadingData: addressRegistrationStreetNameLoading,
                  customResults: addressRegistrationStreetNameResults
                  && Array.isArray(addressRegistrationStreetNameResults)
                    ? addressRegistrationStreetNameResults.map((w) => {
                      const {
                        data: thisData,
                      } = w || {};
                      const {
                        kladr_id: kladrId,
                      } = thisData || {};
                      return (
                        <KladrItem
                          key={kladrId}
                          name="addressRegistrationStreetName"
                          item={w}
                          callback={handleSetDadataValue}
                        />
                      );
                    })
                    : <li>Поиск не дал результатов</li>,
                },
              };
            }
            return x;
          });
        }
        let dataObj = userInfo;
        let callbackObj = handleChangeValue;
        if (blockKey === 'addressRegistration') {
          dataObj = addressRegistration;
          callbackObj = handleChangeAddressRegistrationValue;
        }
        if (blockKey === 'addressResidence') {
          dataObj = addressResidence;
          callbackObj = handleChangeAddressResidenceValue;
        }
        return (
          <div key={blockId} className="add-user-popup__section">
            <div className="add-user-popup__subtitle">{title}</div>
            {formGenerator(
              templateArr,
              dataObj,
              callbackObj,
            )}
          </div>
        );
      });
    }
    return null;
  }, [
    handleChangeAddressResidenceValue,
    handleChangeAddressRegistrationValue,
    addressRegistrationCityNameLoading,
    addressRegistrationStreetNameLoading,
    addressRegistrationCityNameResults,
    addressRegistrationStreetNameResults,
    addressRegistration,
    addressResidence,
    isConcidesPlaceReg,
    userInfo,
    handleChangeValue,
  ]);

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
  userInfo: state.settingsStore.userInfo,
  userInfoLoading: state.settingsStore.userInfoLoading,
  userRoles: state.settingsStore.userRoles,
  userRolesLoading: state.settingsStore.userRolesLoading,
  addressRegistrationCityNameLoading: state.settingsStore.addressRegistrationCityNameLoading,
  addressRegistrationStreetNameLoading: state.settingsStore.addressRegistrationStreetNameLoading,
  addressRegistrationCityNameResults: state.settingsStore.addressRegistrationCityNameResults,
  addressRegistrationStreetNameResults: state.settingsStore.addressRegistrationStreetNameResults,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(UserEditor);
