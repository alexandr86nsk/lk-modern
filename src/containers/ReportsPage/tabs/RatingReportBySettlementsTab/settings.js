const ratingReportBySettlementsFilterTemplate = [
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
    title: 'Название зоны',
    dataKey: 'zoneName',
    type: 'select',
    otherProps: {
      type: '--style-1c',
    },
  },
  {
    id: 3,
    title: 'Код зоны',
    dataKey: 'zoneCode',
    type: 'select',
    otherProps: {
      type: '--style-1c',
    },
  },
  {
    id: 4,
    title: 'Название подзоны',
    dataKey: 'subZoneName',
    type: 'select',
    otherProps: {
      type: '--style-1c',
    },
  },
  {
    id: 5,
    title: 'Код подзоны',
    dataKey: 'subZoneCode',
    type: 'select',
    otherProps: {
      type: '--style-1c',
    },
  },
  {
    id: 6,
    title: 'Супервайзер',
    dataKey: 'supervisorId',
    type: 'select',
    otherProps: {
      type: '--style-1c',
    },
  },
  {
    id: 7,
    title: 'Финансовый консультант',
    dataKey: 'financeConsultId',
    type: 'select',
    otherProps: {
      type: '--style-1c',
    },
  },
];

export default ratingReportBySettlementsFilterTemplate;
