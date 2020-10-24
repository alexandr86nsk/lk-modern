import React from 'react';
import ProgressBar from './ProgressBar/ProgressBar';
import JobStatus from './JobStatus/JobStatus';

export const jobStatusReportTableHeader = [
  {
    id: 0,
    title: 'Название задания',
    dataKey: 'BriefcaseTitle',
    type: '',
    width: 135,
    column: {
      sortable: true,
    },
  },
  {
    id: 1,
    title: 'Статус задания',
    dataKey: 'StatusName',
    type: 'component',
    width: 170,
    component: (el, _) => <JobStatus data={el} dataKey="StatusName" />,
    column: {
      sortable: true,
    },
  },
  {
    id: 2,
    title: 'Время запуска',
    dataKey: 'StartDate',
    type: 'date',
    dateFormat: 'DD.MM.YYYY HH:mm:ss',
    width: 165,
    column: {
      sortable: true,
    },
  },
  {
    id: 3,
    title: 'Количество людей подключенных к заданию',
    dataKey: 'TotalOperators',
    type: '',
    width: 290,
    column: {
      sortable: true,
    },
  },
  {
    id: 4,
    title: '% завершения',
    dataKey: 'Percentage',
    type: 'component',
    component: (el, _) => <ProgressBar data={el} dataKey="Percentage" />,
    column: {
      sortable: true,
    },
  },
];

export const jobHistoryReportTableHeader = [
  {
    id: 0,
    title: 'Название задания',
    dataKey: 'BriefcaseTitle',
    type: '',
    width: 135,
    column: {
      sortable: true,
    },
  },
  {
    id: 1,
    title: 'Статус задания',
    dataKey: 'StatusName',
    type: 'component',
    component: (el, _) => <JobStatus data={el} dataKey="StatusName" />,
    width: 135,
    column: {
      sortable: true,
    },
  },
  {
    id: 2,
    title: 'Время запуска задания',
    dataKey: 'StartDate',
    type: 'date',
    dateFormat: 'DD.MM.YYYY HH:mm:ss',
    column: {
      sortable: true,
    },
  },
  {
    id: 3,
    title: 'Количество соединений',
    dataKey: 'ConnectionsCount',
    type: '',
    width: 135,
    column: {
      sortable: true,
    },
  },
  {
    id: 4,
    title: 'Количество потерянных соединений',
    dataKey: 'LostConnectionsCount',
    type: '',
    width: 135,
    column: {
      sortable: true,
    },
  },
  {
    id: 5,
    title: 'Количество должников',
    dataKey: 'DebtorsCount',
    type: '',
    width: 135,
    column: {
      sortable: true,
    },
  },
  {
    id: 6,
    title: 'Количество обещаний',
    dataKey: 'PromiseCount',
    type: '',
    width: 135,
    column: {
      sortable: true,
    },
  },
  {
    id: 7,
    title: 'Время работы задания',
    dataKey: 'PassedTime',
    type: '',
    width: 135,
    column: {
      sortable: true,
    },
  },
];
