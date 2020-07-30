import React from 'react';
//import MainTab from './addUserPopupTabs/MainTab/MainTab';

export const usersTableConfig = [
  {
    id: 0,
    title: 'Ф.И.О',
    dataKey: 'fio',
    width: 230,
    fixed: true,
    column: {
      sortable: true,
    },
  },
  {
    id: 1,
    title: 'Дата рождения',
    dataKey: 'birthDay',
    type: 'date',
    width: 120,
    column: {
      sortable: true,
    },
  },
  {
    id: 2,
    title: 'Телефон',
    dataKey: 'phone',
    width: 110,
    column: {
      sortable: true,
    },
  },
  {
    id: 3,
    title: 'Статус',
    dataKey: 'isAcceptedUser',
    type: 'component',
    width: 140,
    component: (data) => {
      const { isAcceptedUser } = data || {};
      return (
        <div className={`status ellipsis-element ${isAcceptedUser ? 'success' : 'error'}`}>
          {isAcceptedUser ? 'Подтвержден' : 'Не подтвержден'}
        </div>
      );
    },
    column: {
      sortable: true,
    },
  },
  {
    id: 4,
    title: 'Доступ',
    dataKey: 'isCanUseMobileVer',
    type: 'component',
    width: 120,
    component: (data) => {
      const { isCanUseMobileVer } = data || {};
      return (
        <div className={`status ellipsis-element ${isCanUseMobileVer ? 'success' : 'error'}`}>
          {isCanUseMobileVer ? 'Разрешен' : 'Запрещен'}
        </div>
      );
    },
    column: {
      sortable: true,
    },
  },
  {
    id: 5,
    title: 'Роль',
    dataKey: 'roleDescription',
    column: {
      sortable: true,
    },
  },
  {
    id: 6,
    title: 'Действия',
    type: 'actions',
    fixed: 'right',
    width: 80,
  },
];

/*export const addUserPopupTabs = [
  {
    id: 0,
    title: 'Основные',
    item: <MainTab />,
  },
  /!*  {
      id: 1,
      title: 'Настройки перезвона',
      item: <RecallTab />,
    },
    {
      id: 2,
      title: 'Настройки часовых поясов',
      item: <QueuePhoneTab />,
    }, *!/
];*/
