import React from 'react';
import './UIPageLoader.scss';

function UIPageLoader(props) {
  const { type } = props || {};

  const memoizedBars = React.useMemo(() => {
    const dots = [];
    for (let i = 1; i < 6; i += 1) {
      dots.push(<div key={`bar${i}`} className="ui-page-loader__bar" />);
    }
    return dots;
  }, []);

  return (
    <div className="ui-page-loader">
      <div>
        {memoizedBars}
      </div>
    </div>
  );
}

export default React.memo(UIPageLoader);
