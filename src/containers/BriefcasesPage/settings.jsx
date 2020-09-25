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

export const briefcasesTableTemplate = [
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
    width: 135,
  },
];

export const settingsTabs = [
  {
    id: 0,
    title: 'Настройки',
    item: <MainTab />,
  },
/*  {
    id: 1,
    title: 'Очередь операторов(Архив)',
    item: <RecallTab />,
  },
  {
    id: 2,
    title: 'Настройки часовых поясов',
    item: <QueuePhoneTab />,
  }, */
];
