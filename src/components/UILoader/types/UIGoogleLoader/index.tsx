import React from 'react';
import './style.scss';

function UIGoogleLoader() {
  const memoizedBars = React.useMemo(() => {
    const dots = [];
    for (let i = 1; i < 5; i += 1) {
      dots.push(<div key={`bar${i}`} className={`loader__bar bar${i}`} />);
    }
    return dots;
  }, []);

  return (
    <div className="loader loader--google">
      {memoizedBars}
    </div>
  );
}

export default React.memo(UIGoogleLoader);
