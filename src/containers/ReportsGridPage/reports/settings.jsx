import React from 'react';
import { Progress } from 'semantic-ui-react';

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
    component: (data) => (
      <div className={`job-status${data.StatusName.includes('запущена') ? ' active' : ''}`}>{data.StatusName}</div>
    ),
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
    width: 110,
    component: (data) => (
      <div className="progress-bar">
        {data.Percentage || data.Percentage === 0 ? (
          <Progress
            percent={data.Percentage}
            progress
            size="small"
            error={!data.Percentage}
            warning={data.Percentage < 70}
            success={data.Percentage > 69}
          />
        ) : <span>Нет данных</span>}
      </div>
    ),
    column: {
      sortable: true,
    },
  },
];

export const jobHistoryReportTableHeader = [
  {
    id: 0,
    title: 'Название задания',
    value: 'BriefcaseTitle',
    type: '',
  },
  {
    id: 1,
    title: 'Статус задания',
    value: 'StatusName',
    type: 'component',
    controls: [],
    component: (data) => (
      <div className={`job-status${data.StatusName.includes('запущена') ? ' active' : ''}`}>{data.StatusName}</div>
    ),
  },
  {
    id: 2,
    title: 'Время запуска задания',
    value: 'StartDate',
    type: 'date',
    dateFormat: 'DD.MM.YYYY HH:mm:ss',
  },
  {
    id: 3,
    title: 'Количество соединений',
    value: 'ConnectionsCount',
    type: '',
  },
  {
    id: 4,
    title: 'Количество потерянных соединений',
    value: 'LostConnectionsCount',
    type: '',
  },
  {
    id: 5,
    title: 'Количество должников',
    value: 'DebtorsCount',
    type: '',
  },
  {
    id: 6,
    title: 'Количество обещаний',
    value: 'PromiseCount',
    type: '',
  },
  {
    id: 7,
    title: 'Время работы задания',
    value: 'PassedTime',
    type: '',
  },
];
