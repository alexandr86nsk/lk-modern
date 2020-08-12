import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import actions from '../../../../../redux/actions/actions';
import UILoader from '../../../../../components/UILoader/UILoader';
import UIAnimateHeightBlock from '../../../../../components/UIAnimateHeightBlock/UIAnimateHeightBlock';
import formGenerator from '../../../../../components/utilities/formGenerator';
import KladrItem from './KladrItem';
import {
  userInfoBankTemplate,
  userInfoMainTemplate,
  userInfoOtherTemplate,
  userInfoPassportTemplate,
  addressVariables,
} from '../settings';

function UserEditor(props) {
  const {
    id,
    userInfo,
    userInfoLoading,
    userRoles,
    userRolesLoading,
    trySaveUser,
    addressRegistrationCityNameLoading,
    addressRegistrationStreetNameLoading,
    addressRegistrationCityNameResults,
    addressRegistrationStreetNameResults,
    addressResidenceCityNameLoading,
    addressResidenceStreetNameLoading,
    addressResidenceCityNameResults,
    addressResidenceStreetNameResults,
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
    password,
    commission,
  } = userInfo || {};

  const {
    cityName: addressRegistrationCityName,
    cityNameX: addressRegistrationCityNameX,
    streetName: addressRegistrationStreetName,
    streetNameX: addressRegistrationStreetNameX,
    settlementName: addressRegistrationSettlementName,
    cityFiasID: addressRegistrationCityFiasID,
    countryIsoCode: addressRegistrationCountryIsoCode,
    regionFiasID: addressRegistrationRegionFiasID,
    regionIsoCode: addressRegistrationRegionIsoCode,
  } = addressRegistration || {};

  const {
    cityName: addressResidenceCityName,
    cityNameX: addressResidenceCityNameX,
    streetName: addressResidenceStreetName,
    streetNameX: addressResidenceStreetNameX,
    settlementName: addressResidenceSettlementName,
    cityFiasID: addressResidenceCityFiasID,
    countryIsoCode: addressResidenceCountryIsoCode,
    regionFiasID: addressResidenceRegionFiasID,
    regionIsoCode: addressResidenceRegionIsoCode,
  } = addressResidence || {};

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
    if (addressRegistrationCityName || addressRegistrationSettlementName) {
      settingsStoreSetUserInfoAddressRegistrationSection({
        cityNameX: addressRegistrationCityName || addressRegistrationSettlementName,
      });
    }
  }, [
    addressRegistrationSettlementName,
    settingsStoreSetUserInfoAddressRegistrationSection,
    addressRegistrationCityName,
  ]);

  React.useEffect(() => {
    if (addressResidenceCityName || addressResidenceSettlementName) {
      settingsStoreSetUserInfoAddressResidenceSection({
        cityNameX: addressResidenceCityName || addressResidenceSettlementName,
      });
    }
  }, [
    addressResidenceSettlementName,
    settingsStoreSetUserInfoAddressResidenceSection,
    addressResidenceCityName,
  ]);

  React.useEffect(() => {
    if (addressRegistrationStreetName) {
      settingsStoreSetUserInfoAddressRegistrationSection({
        streetNameX: addressRegistrationStreetName,
      });
    }
  }, [
    settingsStoreSetUserInfoAddressRegistrationSection,
    addressRegistrationStreetName,
  ]);

  React.useEffect(() => {
    if (addressResidenceStreetName) {
      settingsStoreSetUserInfoAddressResidenceSection({
        streetNameX: addressResidenceStreetName,
      });
    }
  }, [
    settingsStoreSetUserInfoAddressResidenceSection,
    addressResidenceStreetName,
  ]);

  React.useEffect(() => {
    settingsStoreSetUserInfoAddressResidenceSection({
      isConcidesPlaceReg,
    });
  }, [
    settingsStoreSetUserInfoAddressResidenceSection,
    isConcidesPlaceReg,
  ]);

  React.useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
    } else if (addressRegistrationCityNameX && !addressRegistrationCityName) {
      settingsStoreDadataGetAddress({
        id: 'addressRegistrationCityName',
        query: {
          from_bound: { value: 'city' },
          query: addressRegistrationCityNameX,
          to_bound: { value: 'settlement' },
        },
      });
    }
  }, [
    settingsStoreDadataGetAddress,
    addressRegistrationCityNameX,
    addressRegistrationCityName,
  ]);

  React.useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
    } else if (addressRegistrationStreetNameX && !addressRegistrationStreetName) {
      settingsStoreDadataGetAddress({
        id: 'addressRegistrationStreetName',
        query: {
          from_bound: { value: 'street' },
          locations: [{
            city_fias_id: addressRegistrationCityFiasID,
            country_iso_code: addressRegistrationCountryIsoCode,
            region_fias_id: addressRegistrationRegionFiasID,
            region_iso_code: addressRegistrationRegionIsoCode,
          }],
          query: addressRegistrationStreetNameX,
          to_bound: { value: 'street' },
        },
      });
    }
  }, [
    addressRegistrationCityFiasID,
    addressRegistrationCountryIsoCode,
    addressRegistrationRegionFiasID,
    addressRegistrationRegionIsoCode,
    settingsStoreDadataGetAddress,
    addressRegistrationStreetNameX,
    addressRegistrationStreetName,
  ]);

  React.useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
    } else if (addressResidenceCityNameX && !addressResidenceCityName) {
      settingsStoreDadataGetAddress({
        id: 'addressResidenceCityName',
        query: {
          from_bound: { value: 'city' },
          query: addressResidenceCityNameX,
          to_bound: { value: 'settlement' },
        },
      });
    }
  }, [
    settingsStoreDadataGetAddress,
    addressResidenceCityNameX,
    addressResidenceCityName,
  ]);

  React.useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
    } else if (addressResidenceStreetNameX && !addressResidenceStreetName) {
      settingsStoreDadataGetAddress({
        id: 'addressResidenceStreetName',
        query: {
          from_bound: { value: 'street' },
          locations: [{
            city_fias_id: addressResidenceCityFiasID,
            country_iso_code: addressResidenceCountryIsoCode,
            region_fias_id: addressResidenceRegionFiasID,
            region_iso_code: addressResidenceRegionIsoCode,
          }],
          query: addressResidenceStreetNameX,
          to_bound: { value: 'street' },
        },
      });
    }
  }, [
    addressResidenceCityFiasID,
    addressResidenceCountryIsoCode,
    addressResidenceRegionFiasID,
    addressResidenceRegionIsoCode,
    settingsStoreDadataGetAddress,
    addressResidenceStreetNameX,
    addressResidenceStreetName,
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
    if (editName === 'phone') {
      settingsStoreSetUserInfoSection({
        [editName]: editValue.replace(/[(]|[)]|[-]/g, ''),
      });
    } else {
      settingsStoreSetUserInfoSection({
        [editName]: editValue,
      });
    }
  }, [settingsStoreSetUserInfoSection]);

  const handleChangeAddressRegistrationValue = React.useCallback((editName, editValue) => {
    if (editName === 'cityNameX') {
      settingsStoreSetUserInfoSection({
        addressRegistration: { cityNameX: editValue },
      });
    } else if (editName === 'streetNameX') {
      settingsStoreSetUserInfoSection({
        addressRegistration: {
          ...addressRegistration,
          streetNameX: editValue,
          streetName: undefined,
        },
      });
    } else {
      settingsStoreSetUserInfoAddressRegistrationSection({
        [editName]: editValue,
      });
    }
  }, [
    addressRegistration,
    settingsStoreSetUserInfoSection,
    settingsStoreSetUserInfoAddressRegistrationSection,
  ]);

  const handleChangeAddressResidenceValue = React.useCallback((editName, editValue) => {
    if (editName === 'isConcidesPlaceReg') {
      settingsStoreSetUserInfoSection({
        isConcidesPlaceReg: editValue,
      });
    } else if (editName === 'cityNameX') {
      settingsStoreSetUserInfoSection({
        addressResidence: { cityNameX: editValue },
      });
    } else if (editName === 'streetNameX') {
      settingsStoreSetUserInfoSection({
        addressResidence: {
          ...addressResidence,
          streetNameX: editValue,
          streetName: undefined,
        },
      });
    } else {
      settingsStoreSetUserInfoAddressResidenceSection({
        [editName]: editValue,
      });
    }
  }, [
    addressResidence,
    settingsStoreSetUserInfoAddressResidenceSection,
    settingsStoreSetUserInfoSection,
  ]);

  const handleSetDadataValue = React.useCallback((editName, editValue) => {
    const {
      data,
      unrestricted_value: value,
    } = editValue || {};
    const {
      city,
    } = data || {};
    const tmpObj = {};
    Object.keys(addressVariables).forEach((v) => {
      if (data[v] || data[v] === 0) {
        tmpObj[addressVariables[v]] = data[v];
        tmpObj.cityNameX = city;
        tmpObj.fullAddress = value;
        tmpObj.block = undefined;
        tmpObj.houseName = undefined;
        tmpObj.flat = undefined;
      }
    });
    if (editName.includes('addressRegistration')) {
      settingsStoreSetUserInfoSection({ addressRegistration: tmpObj });
    }
    if (editName.includes('addressResidence')) {
      settingsStoreSetUserInfoSection({ addressResidence: tmpObj });
    }
  }, [
    settingsStoreSetUserInfoSection,
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
        const isRegistration = blockKey === 'addressRegistration';
        const isResidence = blockKey === 'addressResidence';
        let loadingCities;
        let loadingStreets;
        let customResultsCities;
        let customResultsStreets;
        let disabled;
        if (isRegistration) {
          loadingCities = addressRegistrationCityNameLoading;
          loadingStreets = addressRegistrationStreetNameLoading;
          disabled = !(addressRegistrationCityName || addressRegistrationSettlementName);
          customResultsCities = addressRegistrationCityNameResults
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
            : <li>Поиск не дал результатов</li>;
          customResultsStreets = addressRegistrationStreetNameResults
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
            : <li>Поиск не дал результатов</li>;
        }
        if (isResidence) {
          loadingCities = addressResidenceCityNameLoading;
          loadingStreets = addressResidenceStreetNameLoading;
          disabled = !(addressResidenceCityName || addressResidenceSettlementName);
          customResultsCities = addressResidenceCityNameResults
          && Array.isArray(addressResidenceCityNameResults)
            ? addressResidenceCityNameResults.map((w) => {
              const {
                data: thisData,
              } = w || {};
              const {
                kladr_id: kladrId,
              } = thisData || {};
              return (
                <KladrItem
                  name="addressResidenceCityName"
                  key={kladrId}
                  item={w}
                  callback={handleSetDadataValue}
                />
              );
            })
            : <li>Поиск не дал результатов</li>;
          customResultsStreets = addressResidenceStreetNameResults
          && Array.isArray(addressResidenceStreetNameResults)
            ? addressResidenceStreetNameResults.map((w) => {
              const {
                data: thisData,
              } = w || {};
              const {
                kladr_id: kladrId,
              } = thisData || {};
              return (
                <KladrItem
                  key={kladrId}
                  name="addressResidenceStreetName"
                  item={w}
                  callback={handleSetDadataValue}
                />
              );
            })
            : <li>Поиск не дал результатов</li>;
        }
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
                  loadingData: loadingCities,
                  customResults: customResultsCities,
                },
              };
            }
            if (dataKey === 'streetNameX') {
              return {
                ...x,
                otherProps: {
                  ...otherProps,
                  disabled,
                  loadingData: loadingStreets,
                  customResults: customResultsStreets,
                },
              };
            }
            return x;
          });
        }
        let dataObj = userInfo;
        let callbackObj = handleChangeValue;
        if (isRegistration) {
          dataObj = addressRegistration;
          callbackObj = handleChangeAddressRegistrationValue;
        }
        if (isResidence) {
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
    addressRegistrationCityName,
    addressRegistrationSettlementName,
    addressRegistrationCityNameLoading,
    addressRegistrationStreetNameLoading,
    addressRegistrationCityNameResults,
    addressRegistrationStreetNameResults,
    addressResidenceCityName,
    addressResidenceSettlementName,
    addressResidenceCityNameLoading,
    addressResidenceStreetNameLoading,
    addressResidenceCityNameResults,
    addressResidenceStreetNameResults,
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

  const disableSaveBtn = React.useMemo(() => {
    let errors = 0;

    const checkValueFn = (el) => {
      const {
        dataKey,
        otherProps,
      } = el || {};
      const {
        required,
        minLength,
      } = otherProps || {};
      const {
        [dataKey]: value,
      } = userInfo || {};
      if (required && minLength) {
        if (!(value && value.length >= minLength)) {
          errors += 1;
        }
      }
      if (required && !minLength) {
        if (!value) {
          errors += 1;
        }
      }
    };

    if (userInfoMainTemplate && Array.isArray(userInfoMainTemplate)) {
      userInfoMainTemplate.forEach((v) => {
        checkValueFn(v);
      });
    }

    if (userInfoBankTemplate && Array.isArray(userInfoBankTemplate)) {
      userInfoBankTemplate.forEach((v) => {
        checkValueFn(v);
      });
    }

    if (userInfoOtherTemplate && Array.isArray(userInfoOtherTemplate)) {
      userInfoOtherTemplate.forEach((v) => {
        checkValueFn(v);
      });
    }

    if (userInfoPassportTemplate
      && Array.isArray(userInfoPassportTemplate)
      && userInfoPassportTemplate[0]
      && userInfoPassportTemplate[0].content
      && Array.isArray(userInfoPassportTemplate[0].content)
    ) {
      userInfoPassportTemplate[0].content.forEach((v) => {
        checkValueFn(v);
      });
    }

    if ((!id && !password && !(password && password.length >= 6))
      || !(commission && commission >= 0 && commission <= 100)
      || !addressRegistrationCityName
      || !addressRegistrationStreetName
      || (!isConcidesPlaceReg && !addressResidenceCityName)
      || (!isConcidesPlaceReg && !addressResidenceStreetName)
    ) {
      errors += 1;
    }

    return !!errors;
  }, [
    id,
    password,
    commission,
    userInfo,
    addressRegistrationCityName,
    addressRegistrationStreetName,
    addressResidenceCityName,
    addressResidenceStreetName,
    isConcidesPlaceReg,
  ]);

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
          disabled={userInfoLoading || disableSaveBtn}
          onClick={handleSaveUser}
          loading={trySaveUser}
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
  addressResidenceCityNameLoading: state.settingsStore.addressResidenceCityNameLoading,
  addressResidenceStreetNameLoading: state.settingsStore.addressResidenceStreetNameLoading,
  addressResidenceCityNameResults: state.settingsStore.addressResidenceCityNameResults,
  addressResidenceStreetNameResults: state.settingsStore.addressResidenceStreetNameResults,
  trySaveUser: state.settingsStore.trySaveUser,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(UserEditor);
