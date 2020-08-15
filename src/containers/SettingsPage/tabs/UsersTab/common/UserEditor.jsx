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
    popUpStoreSetSubSection,
    popUpStoreSetSubSectionSection,
    settingsStoreGetUserInfo,
    settingsStoreGetUserInfoCancel,
    settingsStoreSaveUser,
    settingsStoreDadataGetAddress,
    settingsStoreDadataGetAddressCancel,
    hideCallback,
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
    settingsStoreDadataGetAddressCancel();
  }, [
    settingsStoreGetUserInfoCancel,
    settingsStoreDadataGetAddressCancel,
  ]);

  React.useEffect(() => {
    console.log('1');
    if (addressRegistrationCityName || addressRegistrationSettlementName) {
      popUpStoreSetSubSectionSection('userInfo', 'addressRegistration', {
        cityNameX: addressRegistrationCityName || addressRegistrationSettlementName,
      });
    }
  }, [
    addressRegistrationSettlementName,
    addressRegistrationCityName,
    popUpStoreSetSubSectionSection,
  ]);

  React.useEffect(() => {
    console.log('2');
    if (addressResidenceCityName || addressResidenceSettlementName) {
      popUpStoreSetSubSectionSection('userInfo', 'addressResidence', {
        cityNameX: addressResidenceCityName || addressResidenceSettlementName,
      });
    }
  }, [
    popUpStoreSetSubSectionSection,
    addressResidenceSettlementName,
    addressResidenceCityName,
  ]);

  React.useEffect(() => {
    console.log('3');
    if (addressRegistrationStreetName) {
      popUpStoreSetSubSectionSection('userInfo', 'addressRegistration', {
        streetNameX: addressRegistrationStreetName,
      });
    }
  }, [
    popUpStoreSetSubSectionSection,
    addressRegistrationStreetName,
  ]);

  React.useEffect(() => {
    console.log('4');
    if (addressResidenceStreetName) {
      popUpStoreSetSubSectionSection('userInfo', 'addressResidence', {
        streetNameX: addressResidenceStreetName,
      });
    }
  }, [
    popUpStoreSetSubSectionSection,
    addressResidenceStreetName,
  ]);

  React.useEffect(() => {
    console.log('5');
    popUpStoreSetSubSectionSection('userInfo', 'addressResidence', {
      isConcidesPlaceReg,
    });
  }, [
    popUpStoreSetSubSectionSection,
    isConcidesPlaceReg,
  ]);

  React.useEffect(() => {
    console.log('6');
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
    console.log('7');
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
    console.log('8');
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
    console.log('9');
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
    settingsStoreSaveUser({
      el,
      callback: hideCallback,
    });
  }, [hideCallback, isConcidesPlaceReg, userInfo, settingsStoreSaveUser]);

  const handleChangeValue = React.useCallback((editName, editValue) => {
    if (editName === 'phone') {
      popUpStoreSetSubSection('userInfo', {
        [editName]: editValue.replace(/[(]|[)]|[-]/g, ''),
      });
    } else {
      popUpStoreSetSubSection('userInfo', {
        [editName]: editValue,
      });
    }
  }, [popUpStoreSetSubSection]);

  const handleChangeAddressRegistrationValue = React.useCallback((editName, editValue) => {
    if (editName === 'cityNameX') {
      popUpStoreSetSubSection('userInfo', {
        addressRegistration: { cityNameX: editValue },
      });
    } else if (editName === 'streetNameX') {
      popUpStoreSetSubSectionSection('userInfo', 'addressRegistration', {
        streetNameX: editValue,
        streetName: undefined,
      });
    } else {
      popUpStoreSetSubSectionSection('userInfo', 'addressRegistration', {
        [editName]: editValue,
      });
    }
  }, [
    popUpStoreSetSubSection,
    popUpStoreSetSubSectionSection,
  ]);

  const handleChangeAddressResidenceValue = React.useCallback((editName, editValue) => {
    if (editName === 'isConcidesPlaceReg') {
      popUpStoreSetSubSection('userInfo', {
        isConcidesPlaceReg: editValue,
      });
    } else if (editName === 'cityNameX') {
      popUpStoreSetSubSection('userInfo', {
        addressResidence: { cityNameX: editValue },
      });
    } else if (editName === 'streetNameX') {
      popUpStoreSetSubSectionSection('userInfo', 'addressResidence', {
        streetNameX: editValue,
        streetName: undefined,
      });
    } else {
      popUpStoreSetSubSectionSection('userInfo', 'addressResidence', {
        [editName]: editValue,
      });
    }
  }, [
    popUpStoreSetSubSection,
    popUpStoreSetSubSectionSection,
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
      }
    });
    if (editName.includes('addressRegistration')) {
      popUpStoreSetSubSection('userInfo', { addressRegistration: tmpObj });
    }
    if (editName.includes('addressResidence')) {
      popUpStoreSetSubSection('userInfo', { addressResidence: tmpObj });
    }
  }, [
    popUpStoreSetSubSection,
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
          && addressRegistrationCityNameResults.length > 0
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
          && addressRegistrationStreetNameResults.length > 0
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
          && addressResidenceCityNameResults.length > 0
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
          && addressResidenceStreetNameResults.length > 0
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
          <div key={blockId} className="add-item-popup__section">
            <div className="add-item-popup__subtitle">{title}</div>
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
        if (!(value || value === 0)) {
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
      || commission > 100
      || commission < 0
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
    <div className="settings-page__add-user-popup add-item-popup">
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
      <div className="add-item-popup__btn">
        <Button
          circular
          positive
          size="small"
          disabled={userInfoLoading || disableSaveBtn}
          onClick={handleSaveUser}
          loading={trySaveUser}
          title={`${id ? 'Сохранить' : 'Добавить'} пользователя`}
        >
          <Icon name="check" />
          {id ? 'Сохранить' : 'Добавить'}
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  userRoles: state.settingsStore.userRoles,
  userRolesLoading: state.settingsStore.userRolesLoading,
  userInfo: state.popUpStore.userInfo,
  userInfoLoading: state.popUpStore.userInfoLoading,
  addressRegistrationCityNameLoading: state.popUpStore.addressRegistrationCityNameLoading,
  addressRegistrationStreetNameLoading: state.popUpStore.addressRegistrationStreetNameLoading,
  addressRegistrationCityNameResults: state.popUpStore.addressRegistrationCityNameResults,
  addressRegistrationStreetNameResults: state.popUpStore.addressRegistrationStreetNameResults,
  addressResidenceCityNameLoading: state.popUpStore.addressResidenceCityNameLoading,
  addressResidenceStreetNameLoading: state.popUpStore.addressResidenceStreetNameLoading,
  addressResidenceCityNameResults: state.popUpStore.addressResidenceCityNameResults,
  addressResidenceStreetNameResults: state.popUpStore.addressResidenceStreetNameResults,
  trySaveUser: state.popUpStore.trySaveUser,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(UserEditor));
