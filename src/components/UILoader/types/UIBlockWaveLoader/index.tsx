import React from 'react';
import './style.scss';

function UIBlockWaveLoader() {
  const memoizedBars = React.useMemo(() => {
    const dots = [];
    for (let i = 0; i < 6; i += 1) {
      dots.push(<div key={`bar${i}`} className="loader__bar" />);
    }
    return dots;
  }, []);

  return (
    <div className="loader loader--block-wave">
      {memoizedBars}
    </div>
  );
}

export default React.memo(UIBlockWaveLoader);
