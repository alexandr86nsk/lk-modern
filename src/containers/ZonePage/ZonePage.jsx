import React from 'react';
import './ZonePage.scss';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import actions from '../../redux/actions/actions';
import UIElementTitle from '../../components/UIElementTitle/UIElementTitle';
import UIRsuiteTable from '../../components/UIRsuiteTable/UIRsuiteTable';
import tableDefaultConfig from '../../components/UIRsuiteTable/tableDeafultConfig';
import { zonesTableConfig } from './settings';
import WarningIcon from '../../static/images/warning-24px.svg';
import ZoneEditor from './common/ZoneEditor';
import UIBlockTitle from '../../components/UIBlockTitle/UIBlockTitle';

function ZonePage(props) {
  const {
    zones,
    zonesTableStore,
    zonesTableTemplate,
    zoneStoreSetSection,
    zoneStoreGetZones,
    zoneStoreGetZonesCancel,
    zoneStoreSetZonesTableStoreSection,
    zoneStoreSetZonesTableTemplateSection,
    zoneStoreRemoveZone,
    zoneStoreRemoveZoneCancel,
    popUpStoreSetSection,
    modalStoreSetSection,
  } = props || {};

  const handleRefresh = React.useCallback(() => {
    zoneStoreGetZones();
  }, [zoneStoreGetZones]);

  const handleEdit = React.useCallback((value) => {
    const { ZoneID } = value || {};
    popUpStoreSetSection({
      show: true,
      component: <ZoneEditor id={ZoneID} />,
      type: '--horizontal-right-25 --rounded',
    });
  }, [popUpStoreSetSection]);

  const removeZone = React.useCallback((value) => {
    const { ZoneID } = value || {};
    zoneStoreRemoveZone(ZoneID);
  }, [zoneStoreRemoveZone]);

  const handleRemove = React.useCallback((value) => {
    const { fio } = value || {};
    modalStoreSetSection({
      show: true,
      outputBody: {
        icon: <WarningIcon />,
        title: 'Важно',
        body: <div>{`Подтверждаете удаление ${fio ? `пользователя "${fio}"` : 'этого пользователя'}?`}</div>,
      },
      data: value,
      asyncClose: true,
      callback: removeZone,
    });
  }, [modalStoreSetSection, removeZone]);

  const handleAdd = React.useCallback(() => {
    popUpStoreSetSection({
      show: true,
      component: <ZoneEditor />,
      hidePageControl: true,
      type: '--horizontal-right-25 --rounded',
    });
  }, [popUpStoreSetSection]);

  React.useEffect(() => {
    if (!zonesTableTemplate || !zonesTableStore) {
      zoneStoreSetSection({
        zonesTableTemplate: zonesTableConfig,
        zonesTableStore: {
          ...tableDefaultConfig,
          tableRowHeight: 36,
          filter: false,
          customId: 'ZoneID',
          actions: [
            {
              id: 0,
              action: handleEdit,
              title: 'Изменить',
              icon: 'edit',
              hideTitle: true,
            },
            {
              id: 1,
              action: handleRemove,
              title: 'Удалить',
              icon: 'trash',
              hideTitle: true,
            },
          ],
          refreshCallback: handleRefresh,
          onRowDoubleClick: handleEdit,
        },
      });
    }
  }, [
    zonesTableStore,
    zonesTableTemplate,
    zoneStoreSetSection,
    handleRefresh,
    handleEdit,
    handleRemove,
  ]);

  React.useEffect(() => {
    zoneStoreGetZones();
  }, [zoneStoreGetZones]);

  React.useEffect(() => () => {
    zoneStoreGetZonesCancel();
    zoneStoreRemoveZoneCancel();
  }, [
    zoneStoreGetZonesCancel,
    zoneStoreRemoveZoneCancel,
  ]);

  return (
    <div className="zone-page page__content">
      <UIBlockTitle title="Список зон" />
      <div className="element-wrapper --fullscreen">
        <UIElementTitle title="Зоны" />
        <UIRsuiteTable
          tableStore={zonesTableStore}
          tableStoreSetSection={zoneStoreSetZonesTableStoreSection}
          tableTemplate={zonesTableTemplate}
          tableTemplateSetSection={zoneStoreSetZonesTableTemplateSection}
          tableData={zones}
        />
        <div className="add-block">
          <Button
            circular
            primary
            size="small"
            onClick={handleAdd}
          >
            <Icon name="add" />
            Добавить
          </Button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  zones: state.zoneStore.zones,
  zonesTableStore: state.zoneStore.zonesTableStore,
  zonesTableTemplate: state.zoneStore.zonesTableTemplate,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(ZonePage);
