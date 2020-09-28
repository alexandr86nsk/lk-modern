export const callStatisticTableDataTemplate = [
  {
    id: 0,
    title: 'Номер очереди',
    dataKey: 'QueuePhone',
    type: '',
    fixed: 'left',
    width: 125,
    column: {
      sortable: true,
    },
  },
  {
    id: 1,
    title: 'Дата начала',
    dataKey: 'StartPeriod',
    type: 'date',
    width: 120,
    column: {
      sortable: true,
    },
  },
  {
    id: 2,
    title: 'Дата окончания',
    dataKey: 'EndPeriod',
    type: 'date',
    width: 125,
    column: {
      sortable: true,
    },
  },
  {
    id: 3,
    title: 'Время расчета статистики',
    dataKey: 'CalcTime',
    type: 'date',
    width: 185,
    column: {
      sortable: true,
    },
  },
  {
    id: 4,
    title: 'Контактность',
    dataKey: 'CR',
    type: '',
    width: 175,
    column: {
      sortable: true,
    },
  },
  {
    id: 5,
    title: 'Средняя продолжительность переведённого звонка',
    dataKey: 'AvgDurationTalk',
    type: '',
    width: 335,
    column: {
      sortable: true,
    },
  },
  {
    id: 6,
    title: 'Время между завершением соединения и статусом оператора "на линии/в работе"',
    dataKey: 'AvgDurationUpdate',
    type: '',
    width: 510,
    column: {
      sortable: true,
    },
  },
  {
    id: 7,
    title: 'Среднее время набора 1 номера',
    dataKey: 'AvgDurationDial',
    type: '',
    width: 220,
    column: {
      sortable: true,
    },
  },
];

export const callStatisticFilterDataTemplate = [
  {
    id: 0,
    title: 'Название кампании',
    dataKey: 'selectedCallStatisticBriefcase',
    type: 'select',
    otherProps: {
      type: '--style-1c --transparent',
    },
  },
];
