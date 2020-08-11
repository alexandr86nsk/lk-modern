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

const addressVariables = {
  area: 'areaName',
  area_fias_id: 'areaFiasID',
  area_type: 'areaType',
  area_type_full: 'areaTypeFull',
  block: 'block',
  block_type: 'blockType',
  block_type_full: 'blockTypeFull',
  city: 'cityName',
  city_district: 'cityDistrictName',
  city_district_fias_id: 'cityDistrictFiasID',
  city_district_type: 'cityDistrictType',
  city_district_type_full: 'cityDistrictTypeFull',
  city_fias_id: 'cityFiasID',
  city_type: 'cityType',
  city_type_full: 'cityTypeFull',
  fias_id: 'fiasId',
  flat: 'flat',
  flat_type: 'flatType',
  flat_type_full: 'flatTypeFull',
  geo_lat: 'latitude',
  geo_lon: 'longitude',
  house: 'houseName',
  source: 'fullAddress',
  house_fias_id: 'houseFiasID',
  house_type: 'houseType',
  house_type_full: 'houseTypeFull',
  region: 'regionName',
  region_fias_id: 'regionFiasID',
  region_type: 'regionType',
  region_type_full: 'regionTypeFull',
  settlement: 'settlementName',
  settlement_fias_id: 'settlementFiasID',
  settlement_type: 'settlementType',
  settlement_type_full: 'settlementTypeFull',
  street: 'streetName',
  street_fias_id: 'streetFiasID',
  street_type: 'streetType',
  street_type_full: 'streetTypeFull',
};

const KladrItem = (props) => {
  const {
    name,
    item,
    callback,
  } = props || {};

  const {
    unrestricted_value: value,
  } = item || {};

  const handleClick = React.useCallback(() => {
    if (callback) {
      callback(name, item);
    }
  }, [callback, name, item]);

  return (
    <li
      role="presentation"
      title={value}
      onMouseDown={handleClick}
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
    cityNameX: addressRegistrationCityNameX,
    streetName: addressRegistrationStreetName,
    settlementName: addressRegistrationSettlementName,
    fiasId: addressRegistrationFiasId,
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
    settingsStoreSetUserInfoAddressRegistrationSection({
      cityNameX: addressRegistrationCityName || addressRegistrationSettlementName,
    });
  }, [
    addressRegistrationSettlementName,
    settingsStoreSetUserInfoAddressRegistrationSection,
    addressRegistrationCityName,
  ]);

  React.useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
    } else if (addressRegistrationCityNameX && !addressRegistrationFiasId) {
      settingsStoreDadataGetAddress({
        id: 'addressRegistrationCityName',
        query: {
          from_bound: { value: 'city' },
          query: addressRegistrationCityNameX,
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
    addressRegistrationCityNameX,
    addressRegistrationStreetName,
    addressRegistrationFiasId,
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
    if (editName === 'cityNameX') {
      settingsStoreSetUserInfoSection({
        addressRegistration: { cityName: editValue },
      });
    } else {
      settingsStoreSetUserInfoAddressRegistrationSection({
        [editName]: editValue,
      });
    }
  }, [
    settingsStoreSetUserInfoSection,
    settingsStoreSetUserInfoAddressRegistrationSection,
  ]);

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
    const {
      data,
    } = editValue || {};
    const tmpObj = {};
    Object.keys(addressVariables).forEach((v) => {
      if (data[v] || data[v] === 0) {
        tmpObj[addressVariables[v]] = data[v];
      }
    });
    if (editName.includes('addressRegistration')) {
      settingsStoreSetUserInfoSection({ addressRegistration: tmpObj });
    }
    if (editName.includes('addressResidence')) {
      settingsStoreSetUserInfoAddressResidenceSection({
        [editName]: editValue,
      });
    }
  }, [
    settingsStoreSetUserInfoSection,
    settingsStoreSetUserInfoAddressResidenceSection,
  ]);

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
            if (dataKey === 'cityNameX') {
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
    handleSetDadataValue,
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
