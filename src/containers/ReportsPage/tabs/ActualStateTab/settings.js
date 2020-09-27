export const actualStateTableDataTemplate = [
  {
    id: 0,
    title: 'Дата звонка',
    dataKey: 'CallModifyDate',
    type: 'date',
    fixed: 'left',
    width: 115,
    column: {
      sortable: true,
    },
  },
  {
    id: 1,
    title: 'Кампания',
    dataKey: 'BriefcaseTitle',
    type: '',
    width: 100,
    column: {
      sortable: true,
    },
  },
  {
    id: 2,
    title: 'Номер телефона',
    dataKey: 'Phone',
    type: '',
    width: 130,
    column: {
      sortable: true,
    },
  },
  {
    id: 3,
    title: 'Статус звонка',
    dataKey: 'StatusName',
    type: '',
    column: {
      sortable: true,
    },
  },
  {
    id: 4,
    title: 'Результат звонка',
    dataKey: 'ResultName',
    type: '',
    column: {
      sortable: true,
    },
  },
];

export const actualStateFilterDataTemplate = [
  {
    id: 0,
    title: 'Название кампании',
    dataKey: 'selectedActualStateBriefcase',
    type: 'select',
    otherProps: {
      type: '--style-1c --transparent --translate-title',
    },
  },
  {
    id: 1,
    title: 'Дата с',
    dataKey: 'actualStateFrom',
    type: 'datePicker',
    otherProps: {
      type: '--style-1c --transparent --translate-title',
      startOfDay: true,
    },
  },
  {
    id: 2,
    title: 'Дата по',
    dataKey: 'actualStateTo',
    type: 'datePicker',
    otherProps: {
      type: '--style-1c --transparent --translate-title',
      endOfDay: true,
    },
  },
  {
    id: 3,
    title: 'Номер телефона',
    dataKey: 'selectedActualStatePhone',
    type: 'input',
    otherProps: {
      type: '--style-1c --transparent --translate-title',
      mask: '00000000000',
      isSearch: true,
    },
  },
];
