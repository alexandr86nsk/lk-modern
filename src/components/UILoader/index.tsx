import React from 'react';
import './style.scss';
import UIGoogleLoader from './types/UIGoogleLoader';
import UIBlockWaveLoader from './types/UIBlockWaveLoader';

interface IUILoaderProps {
  title?: string;
  type?: string;
  dimmed?: boolean;
  hideTitleDots?: boolean;
}

function UILoader(props: IUILoaderProps) {
  const {
    title,
    type,
    dimmed,
    hideTitleDots,
  } = props || {};

  const className = React.useMemo(() => {
    const baseClass = 'ui-loader';
    let cls = 'ui-loader';
    if (type) {
      try {
        const typeArgs = type.split(' ');
        if (typeArgs && Array.isArray(typeArgs)) {
          typeArgs.forEach((v) => {
            cls = `${cls} ${baseClass}--${v}`;
          });
        }
      } catch (e) {
        console.log('[UILoader] Error: ', e);
      }
    } else {
      cls = `${cls} ${baseClass}--basic`;
    }
    if (title) {
      cls = `${cls} text`;
    }
    return cls;
  }, [title, type]);

  const memoizedTitleDots = React.useMemo(() => {
    const dots = [];
    for (let i = 1; i < 4; i += 1) {
      dots.push(<span key={`dot${i}`} className="ui-loader__dot">.</span>);
    }
    return dots;
  }, []);

  const memoizedLoaderComponent = React.useMemo(() => {
    if (type) {
      try {
        if (type.includes('google')) {
          return <UIGoogleLoader />;
        }
        if (type.includes('block-wave')) {
          return <UIBlockWaveLoader />;
        }
      } catch (e) {
        console.log('[UILoader] Error: ', e);
      }
    }
    return null;
  }, [type]);

  return (
    <>
      <div className={className}>
        <div className="ui-loader__content">
          {memoizedLoaderComponent}
          {title && (
            <div className="ui-loader__title">
              <span className="ui-loader__text">
                {title}
              </span>
              {!hideTitleDots && memoizedTitleDots}
            </div>
          )}
        </div>
      </div>
      {dimmed && <div className="ui-loader__dimmer" />}
    </>
  );
}

export default React.memo(UILoader);
