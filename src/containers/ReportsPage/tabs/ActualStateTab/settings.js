export const actualStateFilterTemplate = [
  {
    id: 0,
    dataKey: 'selectedActualStateBriefcase',
    type: 'select',
    otherProps: {
      type: '--style-1c',
      placeholder: 'Название кампании',
    },
  },
  {
    id: 1,
    dataKey: 'actualStateFrom',
    type: 'datePicker',
    otherProps: {
      type: '--style-1c',
      placeholder: 'Дата с',
      startOfDay: true,
    },
  },
  {
    id: 2,
    dataKey: 'actualStateTo',
    type: 'datePicker',
    otherProps: {
      type: '--style-1c',
      placeholder: 'Дата по',
      endOfDay: true,
    },
  },
  {
    id: 3,
    dataKey: 'selectedActualStatePhone',
    type: 'input',
    otherProps: {
      type: '--style-1c',
      placeholder: 'Номер телефона',
      mask: '00000000000',
      isSearch: true,
    },
  },
];

export default actualStateFilterTemplate;
