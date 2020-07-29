import React from 'react';
import '../../SettingsPage.scss';
import { connect } from 'react-redux';
import actions from '../../../../redux/actions/actions';
import UIElementTitle from '../../../../components/UIElementTitle/UIElementTitle';
import UIRsuiteTable from '../../../../components/UIRsuiteTable/UIRsuiteTable';
import tableDefaultConfig from '../../../../components/UIRsuiteTable/tableDeafultConfig';
import usersTableConfig from './settings';
import WarningIcon from '../../../../static/images/warning-24px.svg';

function UsersTab(props) {
  const {
    users,
    usersTableStore,
    usersTableTemplate,
    settingsStoreSetSection,
    settingsStoreGetUsers,
    settingsStoreGetUsersCancel,
    settingsStoreSetUsersTableStoreSection,
    settingsStoreSetUsersTableTemplateSection,
    settingsStoreRemoveUser,
    settingsStoreRemoveUserCancel,
    popUpStoreSetSection,
    modalStoreSetSection,
  } = props || {};

  React.useEffect(() => {
    settingsStoreGetUsers();
  }, [settingsStoreGetUsers]);

  React.useEffect(() => () => {
    settingsStoreGetUsersCancel();
    settingsStoreRemoveUserCancel();
  }, [
    settingsStoreGetUsersCancel,
    settingsStoreRemoveUserCancel,
  ]);

  const handleRefresh = React.useCallback(() => {
    settingsStoreGetUsers();
  }, [settingsStoreGetUsers]);

  const handleEdit = React.useCallback((el) => {
    popUpStoreSetSection({
      show: true,
      component: <div>{el}</div>,
      hidePageControl: true,
      type: '--horizontal-right-25',
    });
  }, [popUpStoreSetSection]);

  const removeUser = React.useCallback((value) => {
    const { userID } = value || {};
    settingsStoreRemoveUser(userID);
  }, [settingsStoreRemoveUser]);

  const handleRemove = React.useCallback((value) => {
    const { userID } = value || {};
    modalStoreSetSection({
      show: true,
      outputBody: {
        icon: <WarningIcon />,
        title: 'Важно',
        body: <div>{`Действительно хотите удалить пользователя "${userID}"?`}</div>,
      },
      data: value,
      asyncClose: true,
      callback: removeUser,
    });
  }, [modalStoreSetSection, removeUser]);

  React.useEffect(() => {
    settingsStoreSetSection({
      usersTableTemplate: usersTableConfig,
      usersTableStore: {
        ...tableDefaultConfig,
        tableRowHeight: 36,
        filter: false,
        customId: 'userID',
        actions: [
          {
            id: 0,
            action: handleEdit,
            title: 'Настройки',
            icon: 'settings',
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
  }, [
    settingsStoreSetSection,
    handleRefresh,
    handleEdit,
    handleRemove,
  ]);

  return (
    <div className="settings-page__users-tab">
      <div className="element-wrapper --fullscreen">
        <UIElementTitle title="Пользователи" />
        <UIRsuiteTable
          tableStore={usersTableStore}
          tableStoreSetSection={settingsStoreSetUsersTableStoreSection}
          tableTemplate={usersTableTemplate}
          tableTemplateSetSection={settingsStoreSetUsersTableTemplateSection}
          tableData={users}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  users: state.settingsStore.users,
  usersTableStore: state.settingsStore.usersTableStore,
  usersTableTemplate: state.settingsStore.usersTableTemplate,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(UsersTab);
