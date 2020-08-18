const rewardReportFilterTemplate = [
  {
    id: 0,
    title: 'Начало периода',
    dataKey: 'fromDate',
    type: 'datePicker',
    otherProps: {
      type: '--style-1c',
    },
  },
  {
    id: 1,
    title: 'Конец периода',
    dataKey: 'toDate',
    type: 'datePicker',
    otherProps: {
      type: '--style-1c',
      endOfDay: true,
    },
  },
  {
    id: 2,
    title: 'Финансовый консультант',
    dataKey: 'userId',
    type: 'select',
    otherProps: {
      type: '--style-1c',
    },
  },
];

export default rewardReportFilterTemplate;
