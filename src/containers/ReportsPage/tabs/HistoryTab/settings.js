export const historyFilterDataTemplate = [
  {
    id: 0,
    dataKey: 'selectedHistoryBriefcase',
    type: 'select',
    otherProps: {
      type: '--style-1c --transparent',
      placeholder: 'Название кампании',
    },
  },
  {
    id: 1,
    dataKey: 'historyFrom',
    type: 'datePicker',
    otherProps: {
      type: '--style-1c --transparent',
      placeholder: 'Дата с',
      showTimeSelect: true,
      timeFormat: 'HH:mm:ss',
      timeIntervals: 15,
      timeCaption: 'Время с:',
      dateFormat: 'dd/mm/yyyy HH:mm:ss',
    },
  },
  {
    id: 2,
    dataKey: 'historyTo',
    type: 'datePicker',
    otherProps: {
      type: '--style-1c --transparent',
      placeholder: 'Дата по',
      showTimeSelect: true,
      timeFormat: 'HH:mm:ss',
      timeIntervals: 15,
      timeCaption: 'Время по:',
      dateFormat: 'dd/mm/yyyy HH:mm:ss',
    },
  },
];

export default historyFilterDataTemplate;
