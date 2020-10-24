import React from 'react';
import './ProgressBar.scss';
import { Progress } from 'semantic-ui-react';

const ProgressBar = (props) => {
  const {
    data,
    dataKey,
  } = props || {};

  const {
    [dataKey]: progress = 0,
  } = data || {};

  return (
    <div className="progress-bar">
      <Progress
        percent={progress}
        progress
        success={!!(progress && progress === 100)}
        indicating={!!(progress && progress < 100)}
        size="small"
      />
    </div>
  );
};

export default ProgressBar;
