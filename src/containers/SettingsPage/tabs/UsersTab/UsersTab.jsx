import React from 'react';
import '../../SettingsPage.scss';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import actions from '../../../../redux/actions/actions';
import UIElementTitle from '../../../../components/UIElementTitle/UIElementTitle';
import UIRsuiteTable from '../../../../components/UIRsuiteTable/UIRsuiteTable';
import tableDefaultConfig from '../../../../components/UIRsuiteTable/tableDeafultConfig';
import { usersTableConfig } from './settings';
import WarningIcon from '../../../../static/images/warning-24px.svg';
import UserEditor from './common/UserEditor';

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

  const handleEdit = React.useCallback((value) => {
    const { userID } = value || {};
    popUpStoreSetSection({
      show: true,
      component: <UserEditor id={userID} />,
      type: '--horizontal-right-25 --rounded',
    });
  }, [popUpStoreSetSection]);

  const removeUser = React.useCallback((value) => {
    const { userID } = value || {};
    settingsStoreRemoveUser(userID);
  }, [settingsStoreRemoveUser]);

  const handleRemove = React.useCallback((value) => {
    const { fio } = value || {};
    modalStoreSetSection({
      show: true,
      outputBody: {
        icon: <WarningIcon />,
        title: 'Важно',
        body: <div>{`Подтверждаете удаление ${fio ? `"${fio}"` : 'этого пользователя'}?`}</div>,
      },
      data: value,
      asyncClose: true,
      callback: removeUser,
    });
  }, [modalStoreSetSection, removeUser]);

  const handleAdd = React.useCallback(() => {
    popUpStoreSetSection({
      show: true,
      component: <UserEditor />,
      hidePageControl: true,
      type: '--horizontal-right-25 --rounded',
    });
  }, [popUpStoreSetSection]);

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
        <div className="add-block">
          <Button
            circular
            positive
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
  users: state.settingsStore.users,
  usersTableStore: state.settingsStore.usersTableStore,
  usersTableTemplate: state.settingsStore.usersTableTemplate,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(UsersTab);
