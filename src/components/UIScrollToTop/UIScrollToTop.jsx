import React from 'react';
import './UIScrollToTop.scss';
import ArrowUpIcon from '../../assetssadads/icons/keyboard_arrow_up-24px.svg';


function UIScrollToTop(props) {
  const {
    refEl,
    isVisible = false,
    callback,
  } = props;

  const scrollToTop = React.useCallback(() => {
    if (callback) {
      callback();
    } else {
      refEl.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [callback, refEl]);

  return (
    <div className="ui-scroll-to-top">
      {isVisible && (
      <div role="presentation" onClick={scrollToTop}>
        <ArrowUpIcon />
      </div>
      )}
    </div>
  );
}

export default React.memo(UIScrollToTop);
