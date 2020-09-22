import React from 'react';
import './UILoader.scss';

function UILoader(props) {
  const {
    size,
    text,
    type,
    dimmed,
    hideDots,
  } = props || {};

  const className = React.useMemo(() => {
    let cls = 'ui-loader';
    if (size) {
      cls = `${cls} ${size}`;
    }
    if (type) {
      cls = `${cls} ${type}`;
    }
    if (text) {
      cls = `${cls} text`;
    }
    return cls;
  }, [
    size,
    text,
    type,
  ]);

  const memoizedDots = React.useMemo(() => {
    const dots = [];
    for (let i = 1; i < 4; i += 1) {
      dots.push(<span key={`dot${i}`} className={`ui-loader__dot${i}`}>.</span>);
    }
    return dots;
  }, []);

  return (
    <>
      <div className={className}>
        {type && type.includes('--google')
          && (
          <div className="ui-loader__spinner">
            <div className="shape shape-1" />
            <div className="shape shape-2" />
            <div className="shape shape-3" />
            <div className="shape shape-4" />
          </div>
          )}
        <div className="ui-loader__title">
          <span className="ui-loader__text">
            {text}
          </span>
          {!hideDots && memoizedDots}
        </div>
      </div>
      {dimmed && <div className="ui-loader__dimmer" />}
    </>
  );
}

export default React.memo(UILoader);
