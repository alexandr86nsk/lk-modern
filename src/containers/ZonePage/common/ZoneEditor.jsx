import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import actions from '../../../redux/actions/actions';
import formGenerator from '../../../components/utilities/formGenerator';
import { subZoneInfoTemplate, zoneAddressVariables, zoneInfoTemplate } from '../settings';
import KladrItem from '../../SettingsPage/tabs/UsersTab/common/KladrItem';

function ZoneEditor(props) {
  const {
    zoneInfoToEdit,
    trySaveZone,
    isZone,
    zoneInfo,
    zonesSearchResultsLoading,
    zonesSearchResults,
    zoneStoreSaveZone,
    zoneStoreDadataGetAddress,
    zoneStoreDadataGetAddressCancel,
    popUpStoreSetSubSection,
    selectedSubZone,
  } = props || {};

  const {
    id,
    regionNameX,
    cityNameX,
    regionName,
    cityName,
    settlementName,
    code,
    subZoneCode,
  } = zoneInfoToEdit || {};

  const {
    regionFiasID,
    id: zoneId,
  } = zoneInfo || {};

  const isFirstRun = React.useRef(true);

  React.useEffect(() => () => {
    zoneStoreDadataGetAddressCancel();
  }, [
    zoneStoreDadataGetAddressCancel,
  ]);

  React.useEffect(() => {
    if (regionName) {
      popUpStoreSetSubSection('zoneInfoToEdit', { regionNameX: regionName });
    }
  }, [
    regionName,
    popUpStoreSetSubSection,
  ]);

  React.useEffect(() => {
    if (cityName || settlementName) {
      popUpStoreSetSubSection('zoneInfoToEdit', { cityNameX: cityName || settlementName });
    }
  }, [
    cityName,
    settlementName,
    popUpStoreSetSubSection,
  ]);

  React.useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
    } else if (regionNameX) {
      zoneStoreDadataGetAddress({
        from_bound: { value: 'region' },
        query: regionNameX,
        to_bound: { value: 'area' },
      });
    }
  }, [
    zoneStoreDadataGetAddress,
    regionNameX,
  ]);

  React.useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
    } else if (cityNameX) {
      zoneStoreDadataGetAddress({
        locations: [{
          region_fias_id: regionFiasID,
        }],
        from_bound: { value: 'city' },
        query: cityNameX,
        to_bound: { value: 'settlement' },
      });
    }
  }, [
    zoneStoreDadataGetAddress,
    cityNameX,
    regionFiasID,
  ]);

  const handleSetDadataValue = React.useCallback((editName, editValue) => {
    const {
      data,
    } = editValue || {};
    const tmpObj = {};
    Object.keys(zoneAddressVariables).forEach((v) => {
      if (data[v] || data[v] === 0) {
        tmpObj[zoneAddressVariables[v]] = data[v];
      }
    });
    popUpStoreSetSubSection('zoneInfoToEdit', tmpObj);
  }, [
    popUpStoreSetSubSection,
  ]);

  const editedZoneInfoTemplate = React.useMemo(() => {
    const customResults = zonesSearchResults
    && Array.isArray(zonesSearchResults)
    && zonesSearchResults.length > 0
      ? zonesSearchResults.map((w) => {
        const {
          data: thisData,
        } = w || {};
        const {
          kladr_id: kladrId,
        } = thisData || {};
        return (
          <KladrItem
            key={kladrId}
            name="name"
            item={w}
            callback={handleSetDadataValue}
          />
        );
      })
      : <li>Поиск не дал результатов</li>;
    const template = isZone ? zoneInfoTemplate : subZoneInfoTemplate;
    if (template && Array.isArray(template)) {
      return template.map((v) => {
        const { otherProps, dataKey } = v || {};
        const curr = isZone ? 'regionNameX' : 'cityNameX';
        if (dataKey === curr) {
          return {
            ...v,
            otherProps: {
              ...otherProps,
              loadingData: zonesSearchResultsLoading,
              customResults,
            },
          };
        }
        if (dataKey === 'cityTypeFull') {
          return {
            ...v,
            dataKey: settlementName ? 'settlementTypeFull' : 'cityTypeFull',
          };
        }
        return v;
      });
    }
    return [];
  }, [
    isZone,
    settlementName,
    handleSetDadataValue,
    zonesSearchResults,
    zonesSearchResultsLoading,
  ]);

  const handleSaveZone = React.useCallback(() => {
    zoneStoreSaveZone({
      key: isZone ? 'zone' : 'subZone',
      el: zoneInfoToEdit,
      zoneId,
      subZoneId: isZone ? selectedSubZone : undefined,
    });
  }, [selectedSubZone, zoneId, isZone, zoneInfoToEdit, zoneStoreSaveZone]);

  const handleChangeValue = React.useCallback((editName, editValue) => {
    if (editName === 'cityNameX') {
      popUpStoreSetSubSection('zoneInfoToEdit', {
        cityName: undefined,
        cityFiasID: undefined,
        cityType: undefined,
        cityTypeFull: undefined,
        settlementName: undefined,
        settlementFiasID: undefined,
        settlementType: undefined,
        settlementTypeFull: undefined,
        [editName]: editValue,
      });
    } else {
      popUpStoreSetSubSection('zoneInfoToEdit', { [editName]: editValue });
    }
  }, [popUpStoreSetSubSection]);

  const renderContent = React.useMemo(
    () => formGenerator(editedZoneInfoTemplate, zoneInfoToEdit, handleChangeValue),
    [editedZoneInfoTemplate, zoneInfoToEdit, handleChangeValue],
  );

  return (
    <div className="zone-page__add-zone-popup add-item-popup">
      <div className="add-item-popup__title">
        <span className="ellipsis-element">
          {id ? `Редактирование ${isZone ? ' зоны' : 'подзоны'}` : `Добавление ${isZone ? 'зоны' : 'подзоны'}`}
        </span>
      </div>
      <div className="add-item-popup__body">
        <div className="add-item-popup__table">
          <div className="content">
            {renderContent}
          </div>
        </div>
      </div>
      <div className="add-item-popup__btn">
        <Button
          circular
          positive
          size="small"
          onClick={handleSaveZone}
          loading={trySaveZone}
          disabled={(isZone && (!code || !regionName))
          || (!isZone && (!subZoneCode || !(cityName || settlementName)))}
          title={`${id ? 'Сохранить' : 'Добавить'} ${isZone ? 'зону' : 'подзону'}`}
        >
          <Icon name="check" />
          {id ? 'Сохранить' : 'Добавить'}
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  zoneInfo: state.zoneStore.zoneInfo,
  zoneInfoToEdit: state.popUpStore.zoneInfoToEdit,
  trySaveZone: state.popUpStore.trySaveZone,
  zonesSearchResultsLoading: state.popUpStore.zonesSearchResultsLoading,
  zonesSearchResults: state.popUpStore.zonesSearchResults,
  selectedSubZone: state.zoneStore.selectedSubZone,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(ZoneEditor);
