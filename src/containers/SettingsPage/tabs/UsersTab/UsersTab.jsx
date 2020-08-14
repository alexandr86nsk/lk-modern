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
import UsersFilter from './common/UsersFilter';

function UsersTab(props) {
  const {
    users,
    usersTableStore,
    usersTableTemplate,
    filterUsers,
    settingsStoreSetSection,
    settingsStoreGetUsers,
    settingsStoreGetUsersCancel,
    settingsStoreSetUsersTableStoreSection,
    settingsStoreSetUsersTableTemplateSection,
    settingsStoreGetUserRoles,
    settingsStoreGetUserRolesCancel,
    settingsStoreSaveUserCancel,
    settingsStoreRemoveUser,
    settingsStoreRemoveUserCancel,
    popUpStoreSetSection,
    modalStoreSetSection,
    popUpStoreClear,
  } = props || {};

  const {
    paginationCurrentPage,
    paginationNumberOfItemsToPage,
    sortSortingValue,
  } = usersTableStore || {};

  const {
    fio,
    birthDay,
    zoneName,
    subZoneName,
    roleDescription,
  } = filterUsers || {};

  const getUsers = React.useCallback(() => {
    const {
      sortColumn,
      sortType,
    } = sortSortingValue || {};
    if (paginationNumberOfItemsToPage && paginationCurrentPage) {
      settingsStoreGetUsers({
        countPerPage: parseInt(paginationNumberOfItemsToPage, 10),
        pageNumber: paginationCurrentPage,
        orderColumnName: sortColumn,
        orderDirection: sortType,
        fio: fio || undefined,
        birthDay: birthDay || undefined,
        zoneName: zoneName || undefined,
        subZoneName: subZoneName || undefined,
        roleName: roleDescription || undefined,
      });
    }
  }, [
    fio,
    birthDay,
    zoneName,
    subZoneName,
    roleDescription,
    paginationNumberOfItemsToPage,
    paginationCurrentPage,
    sortSortingValue,
    settingsStoreGetUsers,
  ]);

  const handleRefresh = React.useCallback(() => {
    getUsers();
  }, [getUsers]);

  const handleEdit = React.useCallback((value) => {
    const { userID } = value || {};
    popUpStoreSetSection({
      show: true,
      component: <UserEditor id={userID} hideCallback={getUsers} />,
      type: '--horizontal-right-25 --rounded',
    });
  }, [getUsers, popUpStoreSetSection]);

  const removeUser = React.useCallback((value) => {
    const { userID } = value || {};
    settingsStoreRemoveUser({
      el: userID,
      callback: getUsers,
    });
  }, [getUsers, settingsStoreRemoveUser]);

  const handleRemove = React.useCallback((value) => {
    const { fio: userFio } = value || {};
    modalStoreSetSection({
      show: true,
      outputBody: {
        icon: <WarningIcon />,
        title: 'Важно',
        body: <div>{`Подтверждаете удаление ${userFio ? `пользователя "${userFio}"` : 'этого пользователя'}?`}</div>,
      },
      data: value,
      asyncClose: true,
      callback: removeUser,
    });
  }, [modalStoreSetSection, removeUser]);

  const handleAdd = React.useCallback(() => {
    popUpStoreSetSection({
      show: true,
      component: <UserEditor hideCallback={getUsers} />,
      hidePageControl: true,
      type: '--horizontal-right-25 --rounded',
    });
  }, [getUsers, popUpStoreSetSection]);

  React.useEffect(() => {
    if (!usersTableTemplate || !usersTableStore) {
      settingsStoreSetSection({
        usersTableTemplate: usersTableConfig,
        usersTableStore: {
          ...tableDefaultConfig,
          paginationServerSide: true,
          searchServerSide: true,
          sortServerSide: true,
          tableRowHeight: 36,
          filter: false,
          customId: 'userID',
          sortSortingValue: {
            sortColumn: 'fio',
            sortType: 'asc',
          },
          refresh: false,
          onRowDoubleClick: handleEdit,
          searchCustom: <UsersFilter />,
        },
      });
    }
  }, [
    usersTableStore,
    usersTableTemplate,
    settingsStoreSetSection,
    handleRefresh,
    handleEdit,
    handleRemove,
  ]);

  React.useEffect(() => {
    settingsStoreSetUsersTableStoreSection({
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
    });
  }, [
    handleEdit,
    handleRemove,
    settingsStoreSetUsersTableStoreSection,
  ]);

  React.useEffect(() => {
    getUsers();
  }, [
    getUsers,
  ]);

  React.useEffect(() => {
    settingsStoreGetUserRoles();
  }, [
    settingsStoreGetUserRoles,
  ]);

  React.useEffect(() => () => {
    settingsStoreGetUsersCancel();
    settingsStoreGetUserRolesCancel();
    settingsStoreSaveUserCancel();
    settingsStoreRemoveUserCancel();
    popUpStoreClear();
  }, [
    settingsStoreGetUsersCancel,
    settingsStoreGetUserRolesCancel,
    settingsStoreSaveUserCancel,
    settingsStoreRemoveUserCancel,
    popUpStoreClear,
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
            primary
            size="small"
            onClick={handleRefresh}
            icon="refresh"
            title="Обновить таблицу"
          />
          <Button
            circular
            primary
            size="small"
            onClick={handleAdd}
            title="Добавить пользователя"
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
  filterUsers: state.settingsStore.filterUsers,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(UsersTab);
