import React from 'react';
import './UIAnimateHeightBlock.scss';
import AnimateHeight from 'react-animate-height';
import UILoader from '../Loader/Loader';

const heightVariables = {
  true: 'auto',
  false: 0,
};

function UIAnimateHeightBlock(props) {
  const { title, blockName, body, loading } = props || {};

  const [height, setHeight] = React.useState(true);

  const handleActiveClick = React.useCallback(() => {
    setHeight(!height);
  }, [height]);

  return (
    <div className={`ui-animate-height-block${height ? ' active' : ''}`}>
      <div
        role="presentation"
        className="ui-animate-height-block__header"
        onClick={handleActiveClick}
      >
        <i
          className={`ui-animate-height-block__dropdown-icon icon ${
            height ? 'minus square outline' : 'plus square outline'
          }`}
          aria-hidden
        />
        <div className="ui-animate-height-block__title">
          <span className="ui-animate-height-block__text ellipsis-element">{title}</span>
        </div>
      </div>
      <AnimateHeight duration={300} height={heightVariables[height]}>
        <div className={`ui-animate-height-block__body${blockName ? ` ${blockName}` : ''}`}>
          {loading && (
            <span className="ui-animate-height-block__loader">
              <UILoader text="Загрузка..." />
            </span>
          )}
          {body}
        </div>
      </AnimateHeight>
    </div>
  );
}

export default React.memo(UIAnimateHeightBlock);
