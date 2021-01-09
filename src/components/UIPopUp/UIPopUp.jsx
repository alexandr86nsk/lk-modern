import React from 'react';
import './UIPopUp.scss';
import CloseIcon from '../../assetssadads/icons/close-10px.svg';
import useScrollPage from '../UICustomHooks/useScrollPage/useScrollPage';
import UIScrollToTop from '../UIScrollToTop/UIScrollToTop';

function UIPopUp(props) {
  const {
    callback,
    component,
    noEscape,
    type,
    closingImpossible,
    title,
  } = props || {};

  const [scroll, setScroll] = React.useState(false);
  const pageEl = React.useRef(null);
  useScrollPage(setScroll, pageEl);

  const handleClose = React.useCallback(() => {
    if (!closingImpossible) {
      if (callback) {
        callback();
      }
    }
  }, [closingImpossible, callback]);

  React.useEffect(() => {
    function handleClickEscape(event) {
      if (event.key === 'Escape' && !noEscape) {
        handleClose();
      }
    }
    document.addEventListener('keydown', handleClickEscape);
    return () => {
      document.removeEventListener('keydown', handleClickEscape);
    };
  }, [handleClose, noEscape]);

  return (
    <div
      className={`ui-popup ${type || ''}`}
    >
      <div className="ui-popup__wrapper">
        <div className="ui-popup__top-panel">
          <div className="ui-popup__title">{title || ''}</div>
          <div
            className="ui-popup__close-block"
          >
            <div
              role="presentation"
              className="ui-popup__close-btn"
              onClick={handleClose}
            >
              <CloseIcon />
            </div>
          </div>
        </div>
        <div className="ui-popup__data-block">
          <div className="ui-popup__body" ref={pageEl}>
            {component && component}
          </div>
          <UIScrollToTop isVisible={scroll} refEl={pageEl.current} />
        </div>
      </div>
    </div>
  );
}

export default React.memo(UIPopUp);
