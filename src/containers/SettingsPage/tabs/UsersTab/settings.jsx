import React from 'react';
// import MainTab from './addUserPopupTabs/MainTab/MainTab';

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
    title: 'Доступ в моб.приложение',
    dataKey: 'isCanUseMobileVer',
    type: 'component',
    width: 185,
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

export const userInfoMainTemplate = [
  {
    id: 0,
    title: 'Фамилия',
    dataKey: 'lastName',
    type: 'input',
    otherProps: {
      type: '--style-1c',
    },
  },
  {
    id: 1,
    title: 'Имя',
    data: 'firstName',
    type: 'input',
    otherProps: {
      required: true,
      successFormat: 'Поле обязательно для заполнения',
      type: '--style-1c',
    },
  },
  {
    id: 2,
    title: 'Отчетсво',
    data: 'middleName',
    type: 'input',
    otherProps: {
      type: '--style-1c',
    },
  },
  {
    id: 3,
    title: 'Пароль',
    data: 'password',
    type: 'input',
    otherProps: {
      type: '--style-1c',
    },
  },
  {
    id: 4,
    title: 'Рабочий телефон',
    data: 'phone',
    type: 'input',
    otherProps: {
      required: true,
      successFormat: 'Это поле обязательно для заполнения и должно иметь корректный формат. Пример: "+7(999)888-00-00"',
      type: '--style-1c',
    },
  },
  {
    id: 5,
    title: '% вознаграждения',
    data: 'commission',
    type: 'input',
    otherProps: {
      required: true,
      successFormat: 'Поле обязательно для заполнения и должно содержать максимум 3 цифры',
      mask: '000',
      type: '--style-1c',
    },
  },
  {
    id: 6,
    title: 'Доступ в моб.приложение',
    data: 'isCanUseMobileVer',
    type: 'checkbox',
    otherProps: {
      required: true,
      successFormat: 'Поле обязательно для заполнения',
      type: '--style-1c',
    },
  },
  {
    id: 7,
    title: 'Доступ к отчетности',
    data: 'isCanUseReports',
    type: 'checkbox',
    otherProps: {
      required: true,
      type: '--style-1c',
    },
  },
  {
    id: 8,
    title: 'Роль',
    data: 'roleID',
    type: 'select',
    otherProps: {
      required: true,
      type: '--style-1c',
    },
  },
  {
    id: 9,
    title: 'Зона',
    data: 'zoneID',
    type: 'select',
    otherProps: {
      required: true,
      type: '--style-1c',
    },
  },
];

/* export const addUserPopupTabs = [
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
]; */
