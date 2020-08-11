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
      required: true,
      successFormat: 'Поле обязательно для заполнения',
      minLength: 1,
      type: '--style-1c',
    },
  },
  {
    id: 1,
    title: 'Имя',
    dataKey: 'firstName',
    type: 'input',
    otherProps: {
      required: true,
      successFormat: 'Поле обязательно для заполнения',
      minLength: 1,
      type: '--style-1c',
    },
  },
  {
    id: 2,
    title: 'Отчество',
    dataKey: 'middleName',
    type: 'input',
    otherProps: {
      type: '--style-1c',
    },
  },
  {
    id: 3,
    title: 'Пароль',
    dataKey: 'password',
    type: 'input',
    otherProps: {
      type: '--style-1c',
    },
  },
  {
    id: 4,
    title: 'Рабочий телефон',
    dataKey: 'phone',
    type: 'input',
    otherProps: {
      required: true,
      mask: '+7(000)000-00-00',
      minLength: 16,
      successFormat: 'Это поле обязательно для заполнения и должно иметь корректный формат. Пример: "+7(999)888-00-00"',
      type: '--style-1c',
    },
  },
  {
    id: 5,
    title: '% вознаграждения',
    dataKey: 'commission',
    type: 'input',
    otherProps: {
      required: true,
      successFormat: 'Поле обязательно для заполнения и должно быть не больше 100',
      mask: '000',
      type: '--style-1c',
      isInteger: true,
      minInteger: 0,
      maxInteger: 100,
    },
  },
  {
    id: 6,
    title: 'Доступ в моб.приложение',
    dataKey: 'isCanUseMobileVer',
    type: 'checkbox',
    otherProps: {
      type: '--style-1c',
      toggle: true,
    },
  },
  {
    id: 7,
    title: 'Доступ к отчетности',
    dataKey: 'isCanUseReports',
    type: 'checkbox',
    otherProps: {
      type: '--style-1c',
      toggle: true,
    },
  },
  {
    id: 8,
    title: 'Роль',
    dataKey: 'roleID',
    type: 'select',
    otherProps: {
      required: true,
      type: '--style-1c',
    },
  },
  {
    id: 9,
    title: 'Подтвердить пользователя',
    dataKey: 'isAcceptedUser',
    type: 'checkbox',
    otherProps: {
      toggle: true,
      type: '--style-1c',
    },
  },
];

export const userInfoPassportTemplate = [
  {
    id: 0,
    title: 'Основные',
    blockKey: 'main',
    content: [
      {
        id: 0,
        title: 'Дата рождения',
        dataKey: 'birthDay',
        type: 'datePicker',
        otherProps: {
          type: '--style-1c',
          required: true,
        },
      },
      {
        id: 1,
        title: 'Место рождения',
        dataKey: 'birthPlace',
        type: 'input',
        otherProps: {
          required: true,
          successFormat: 'Поле обязательно для заполнения',
          minLength: 1,
          type: '--style-1c',
        },
      },
      {
        id: 2,
        title: 'Паспорт серия',
        dataKey: 'passSeries',
        type: 'input',
        otherProps: {
          required: true,
          minLength: 4,
          successFormat: 'Поле обязательно для заполнения и должно содержать 4 цифры',
          mask: '0000',
          type: '--style-1c',
        },
      },
      {
        id: 3,
        title: 'Паспорт номер',
        dataKey: 'passNumber',
        type: 'input',
        otherProps: {
          required: true,
          minLength: 6,
          successFormat: 'Поле обязательно для заполнения и должно содержать 6 цифр',
          mask: '000000',
          type: '--style-1c',
        },
      },
      {
        id: 4,
        title: 'Паспорт дата выдачи',
        dataKey: 'passIssuedDate',
        type: 'datePicker',
        otherProps: {
          required: true,
          successFormat: 'Это поле обязательно для заполнения',
          type: '--style-1c',
        },
      },
      {
        id: 5,
        title: 'Паспорт место выдачи',
        dataKey: 'passIssued',
        type: 'input',
        otherProps: {
          required: true,
          successFormat: 'Поле обязательно для заполнения',
          minLength: 1,
          type: '--style-1c',
        },
      },
    ],
  },
  {
    id: 1,
    title: 'Регистрация',
    blockKey: 'addressRegistration',
    content: [
      {
        id: 6,
        title: 'Регистрация город / н.п.',
        dataKey: 'cityName',
        type: 'search',
        otherProps: {
          asInput: true,
          required: true,
          type: '--style-1c',
        },
      },
      {
        id: 7,
        title: 'Регистрация улица',
        dataKey: 'streetName',
        type: 'search',
        otherProps: {
          asInput: true,
          required: true,
          type: '--style-1c',
        },
      },
      {
        id: 8,
        title: 'Регистрация корпус',
        dataKey: 'block',
        type: 'input',
        otherProps: {
          type: '--style-1c',
        },
      },
      {
        id: 9,
        title: 'Регистрация № дома',
        dataKey: 'houseName',
        type: 'input',
        otherProps: {
          type: '--style-1c',
        },
      },
      {
        id: 10,
        title: 'Регистрация квартира',
        dataKey: 'flat',
        type: 'input',
        otherProps: {
          type: '--style-1c',
        },
      },
    ],
  },
  {
    id: 2,
    title: 'Фактическое место проживания',
    blockKey: 'addressResidence',
    content: [
      {
        id: 11,
        title: 'Место проживания, совпадает с местом регистрации',
        dataKey: 'isConcidesPlaceReg',
        type: 'checkbox',
        otherProps: {
          toggle: true,
          type: '--style-1c',
        },
      },
      {
        id: 12,
        title: 'Место проживания город',
        dataKey: 'cityName',
        type: 'input',
        otherProps: {
          type: '--style-1c',
        },
      },
      {
        id: 13,
        title: 'Место проживания улица',
        dataKey: 'streetName',
        type: 'input',
        otherProps: {
          type: '--style-1c',
        },
      },
      {
        id: 14,
        title: 'Место проживания корпус',
        dataKey: 'block',
        type: 'input',
        otherProps: {
          type: '--style-1c',
        },
      },
      {
        id: 15,
        title: 'Место проживания № дома',
        dataKey: 'houseName',
        type: 'input',
        otherProps: {
          type: '--style-1c',
        },
      },
      {
        id: 16,
        title: 'Место проживания квартира',
        dataKey: 'flat',
        type: 'input',
        otherProps: {
          type: '--style-1c',
        },
      },
    ],
  },
];

export const userInfoOtherTemplate = [
  {
    id: 0,
    title: 'ИНН сотрудника',
    dataKey: 'inn',
    type: 'input',
    otherProps: {
      required: true,
      minLength: 12,
      successFormat: 'Поле обязательно для заполнения и должно содержать 12 цифр',
      mask: '000000000000',
      type: '--style-1c',
    },
  },
  {
    id: 1,
    title: 'СНИЛС сотрудника',
    dataKey: 'snils',
    type: 'input',
    otherProps: {
      required: true,
      minLength: 14,
      successFormat: 'Поле обязательно для заполнения и должно содержать 11 цифр',
      mask: '000-000-000 00',
      type: '--style-1c',
    },
  },
];

export const userInfoBankTemplate = [
  {
    id: 0,
    title: 'Счет получателя',
    dataKey: 'account',
    type: 'input',
    otherProps: {
      required: true,
      successFormat: 'Поле обязательно для заполнения и должно содержать 20 цифр',
      minLength: 20,
      mask: '00000000000000000000',
      type: '--style-1c',
    },
  },
  {
    id: 1,
    title: 'Номер карты',
    dataKey: 'cardNumber',
    type: 'input',
    otherProps: {
      required: true,
      successFormat: 'Поле обязательно для заполнения и должно содержать от 13 до 19 цифр',
      minLength: 13,
      mask: '0000000000000000000',
      type: '--style-1c',
    },
  },
  {
    id: 2,
    title: 'Кор.счет',
    dataKey: 'bankCorrNumber',
    type: 'input',
    otherProps: {
      required: true,
      successFormat: 'Поле обязательно для заполнения и должно содержать 20 цифр',
      minLength: 20,
      mask: '00000000000000000000',
      type: '--style-1c',
    },
  },
  {
    id: 3,
    title: 'Банк получателя',
    dataKey: 'bankName',
    type: 'input',
    otherProps: {
      required: true,
      successFormat: 'Поле обязательно для заполнения',
      minLength: 1,
      type: '--style-1c',
    },
  },
  {
    id: 4,
    title: 'ИНН Банка получателя',
    dataKey: 'bankINN',
    type: 'input',
    otherProps: {
      required: true,
      successFormat: 'Поле обязательно для заполнения и должно содержать 10 цифр',
      minLength: 10,
      mask: '0000000000',
      type: '--style-1c',
    },
  },
  {
    id: 5,
    title: 'КПП Банка получателя',
    dataKey: 'bankKPP',
    type: 'input',
    otherProps: {
      required: true,
      successFormat: 'Поле обязательно для заполнения и должно содержать 9 цифр',
      minLength: 9,
      mask: '000000000',
      type: '--style-1c',
    },
  },
  {
    id: 6,
    title: 'БИК',
    dataKey: 'bankBIK',
    type: 'input',
    otherProps: {
      required: true,
      successFormat: 'Поле обязательно для заполнения и должно содержать 9 цифр',
      minLength: 9,
      mask: '000000000',
      type: '--style-1c bottom',
    },
  },
];
