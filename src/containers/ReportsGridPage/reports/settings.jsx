import React from 'react';
import { Progress } from 'semantic-ui-react';

export const jobStatusReportTableHeader = [
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
    dateFormat: "DD.MM.YYYY HH:mm:ss"
  },
  {
    id: 3,
    title: 'Количество людей подключенных к заданию',
    value: 'TotalOperators',
    type: '',
  },
  {
    id: 4,
    title: '% завершения',
    value: 'Percentage',
    type: 'component',
    controls: [],
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
    dateFormat: "DD.MM.YYYY HH:mm:ss"
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
