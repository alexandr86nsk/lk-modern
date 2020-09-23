import React from 'react';
import MainTab from './settingsTabs/MainTab/MainTab';
// import QueuePhoneTab from './settingsTabs/QueuePhoneTab/QueuePhoneTab';
// import RecallTab from './settingsTabs/RecallTab/RecallTab';

const briefStatusOptions = {
  0: 'Ошибка',
  1: 'Кампания создана',
  2: 'Загружается',
  3: 'Ожидает запуска',
  4: 'Кампания запущена на обзвон',
  5: 'Кампания остановлена',
  6: 'Кампания выполнена',
};

const briefStatusColorOptions = {
  0: 'red',
  1: 'gray',
  2: 'gray',
  3: 'gray',
  4: 'green',
  5: 'gray',
  6: 'gray',
};

const callStatusOptions = {
  0: 'Создан',
  1: 'В очереди',
  2: 'Попытка соединения',
  3: 'Неудачная попытка соединения',
  4: 'Соединен с оператором',
  5: 'Завершен',
  6: 'Абонент недоступен/не взял трубку"',
};

const callResultOptions = {
  0: 'Ошибка',
  1: 'Поставлен в очередь',
  2: 'Звонок прошел успешно',
  3: 'Автоответчик',
  4: 'Бросили трубку',
  5: 'Нет ответа',
};

export const briefcaseListTableTemplate = [
  {
    id: 0,
    title: 'Название',
    dataKey: 'QueuePhone',
    width: 90,
    fixed: true,
    column: {
      sortable: true,
    },
  },
  {
    id: 1,
    title: 'Дата последнего изменения',
    dataKey: 'LastCheckQueueMembers',
    type: 'date',
    column: {
      sortable: true,
    },
  },
  {
    id: 2,
    title: 'Действия',
    type: 'icon-actions',
    fixed: 'right',
    width: 190,
  },
];

export const itemHeader = [
  {
    id: 0,
    title: 'Статус звонка',
    value: 'StatusId',
    type: 'options-select',
    options: [],
    controls: [],
  },
  {
    id: 1,
    title: 'Результат звонка',
    value: 'ResultId',
    type: 'options-select',
    options: [],
    controls: [],
  },
  {
    id: 2,
    title: 'Часовой пояс',
    value: 'TimeZone',
    type: '',
    controls: [],
  },
  {
    id: 3,
    title: 'Телефон1',
    value: 'Phone1',
    type: '',
    controls: [],
  },
  {
    id: 4,
    title: 'Телефон2',
    value: 'Phone2',
    type: '',
    controls: [],
  },
  {
    id: 5,
    title: 'Телефон3',
    value: 'Phone3',
    type: '',
    controls: [],
  },
  {
    id: 6,
    title: 'Телефон4',
    value: 'Phone4',
    type: '',
    controls: [],
  },
  {
    id: 7,
    title: 'Телефон5',
    value: 'Phone5',
    type: '',
    controls: [],
  },
  {
    id: 8,
    title: 'Телефон6',
    value: 'Phone6',
    type: '',
    controls: [],
  },
  {
    id: 9,
    title: 'Телефон7',
    value: 'Phone7',
    type: '',
    controls: [],
  },
  {
    id: 10,
    title: 'Телефон8',
    value: 'Phone8',
    type: '',
    controls: [],
  },
  {
    id: 11,
    title: 'Телефон9',
    value: 'Phone9',
    type: '',
    controls: [],
  },
  {
    id: 12,
    title: 'Телефон10',
    value: 'Phone10',
    type: '',
    controls: [],
  },
  {
    id: 13,
    title: 'Телефон11',
    value: 'Phone11',
    type: '',
    controls: [],
  },
  {
    id: 14,
    title: 'Телефон12',
    value: 'Phone12',
    type: '',
    controls: [],
  },
  {
    id: 15,
    title: 'Телефон13',
    value: 'Phone13',
    type: '',
    controls: [],
  },
  {
    id: 16,
    title: 'Телефон14',
    value: 'Phone14',
    type: '',
    controls: [],
  },
  {
    id: 17,
    title: 'Телефон15',
    value: 'Phone15',
    type: '',
    controls: [],
  },
  {
    id: 18,
    title: 'Телефон16',
    value: 'Phone16',
    type: '',
    controls: [],
  },
  {
    id: 19,
    title: 'Телефон17',
    value: 'Phone17',
    type: '',
    controls: [],
  },
  {
    id: 20,
    title: 'Телефон18',
    value: 'Phone18',
    type: '',
    controls: [],
  },
  {
    id: 21,
    title: 'Телефон19',
    value: 'Phone19',
    type: '',
    controls: [],
  },
  {
    id: 22,
    title: 'Телефон20',
    value: 'Phone20',
    type: '',
    controls: [],
  },
];

export const settingsTabs = [
  {
    id: 0,
    title: 'Основные',
    item: <MainTab />,
  },
/*  {
    id: 1,
    title: 'Настройки перезвона',
    item: <RecallTab />,
  },
  {
    id: 2,
    title: 'Настройки часовых поясов',
    item: <QueuePhoneTab />,
  },*/
];
