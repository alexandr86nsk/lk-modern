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
    dataKey: 'selectedActualStateBriefcase',
    type: 'select',
    otherProps: {
      type: '--style-1c --transparent',
      placeholder: 'Название кампании',
    },
  },
  {
    id: 1,
    dataKey: 'actualStateFrom',
    type: 'datePicker',
    otherProps: {
      type: '--style-1c --transparent',
      placeholder: 'Дата с',
      startOfDay: true,
    },
  },
  {
    id: 2,
    dataKey: 'actualStateTo',
    type: 'datePicker',
    otherProps: {
      type: '--style-1c --transparent',
      placeholder: 'Дата по',
      endOfDay: true,
    },
  },
  {
    id: 3,
    dataKey: 'selectedActualStatePhone',
    type: 'input',
    otherProps: {
      type: '--style-1c --transparent',
      placeholder: 'Номер телефона',
      mask: '00000000000',
      isSearch: true,
    },
  },
];
