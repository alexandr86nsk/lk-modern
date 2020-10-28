import React from 'react';
import './style.scss';

function UIBlockWaveLoader() {
  const memoizedBars = React.useMemo(() => {
    const dots = [];
    for (let i = 1; i < 6; i += 1) {
      dots.push(<div key={`bar${i}`} className="ui-block-wave-loader__bar" />);
    }
    return dots;
  }, []);

  return (
    <div className="ui-block-wave-loader">
      <div>
        {memoizedBars}
      </div>
    </div>
  );
}

export default React.memo(UIBlockWaveLoader);
