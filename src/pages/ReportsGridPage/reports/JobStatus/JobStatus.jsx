import React from 'react';
import './JobStatus.scss';

const JobStatus = (props) => {
  const {
    data,
    dataKey,
  } = props || {};

  const {
    [dataKey]: status,
  } = data || {};

  return (
    <div className={`job-status${status.includes('запущена') ? ' active' : ''}`}>{status || 'нет данных'}</div>
  );
};

export default JobStatus;
