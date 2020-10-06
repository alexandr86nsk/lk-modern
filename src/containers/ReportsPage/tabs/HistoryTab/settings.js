export const historyFilterDataTemplate = [
  {
    id: 0,
    title: 'Название кампании',
    dataKey: 'selectedHistoryBriefcase',
    type: 'select',
    otherProps: {
      type: '--style-1c --transparent --translate-title',
      isVirtualized: true,
    },
  },
  {
    id: 1,
    title: 'Дата с',
    dataKey: 'historyFrom',
    type: 'datePicker',
    otherProps: {
      type: '--style-1c --transparent --translate-title',
      showTimeSelect: true,
      timeFormat: 'HH:mm:ss',
      timeIntervals: 15,
      timeCaption: 'Время с:',
      dateFormat: 'dd/mm/yyyy HH:mm:ss',
    },
  },
  {
    id: 2,
    title: 'Дата по',
    dataKey: 'historyTo',
    type: 'datePicker',
    otherProps: {
      type: '--style-1c --transparent --translate-title',
      showTimeSelect: true,
      timeFormat: 'HH:mm:ss',
      timeIntervals: 15,
      timeCaption: 'Время по:',
      dateFormat: 'dd/mm/yyyy HH:mm:ss',
    },
  },
];

export default historyFilterDataTemplate;
