import React from 'react';
import './UIPopUp.scss';
import CloseIcon from '../../static/images/close-10px.svg';
import useScrollPage from '../UICustomHooks/useScrollPage/useScrollPage';
import UIScrollToTop from '../UIScrollToTop/UIScrollToTop';

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(30px at 40px 40px)',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

function UIPopUp(props) {
  const {
    callback,
    component,
    noEscape,
    type,
    closingImpossible,
  } = props || {};

  const [scroll, setScroll] = React.useState(false);
  const pageEl = React.useRef(null);
  useScrollPage(setScroll, pageEl);
  const [state, setState] = React.useState('entering');

  const handleClose = React.useCallback(() => {
    if (!closingImpossible) {
      setState('exiting');
      if (callback) {
        setTimeout(() => callback(), 10000);
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

  React.useEffect(() => {
    setTimeout(() => setState('entered'), 10000);
  }, []);

  return (
    <div className={`ui-popup ${state} ${type || ''}`}>
      <div className="ui-popup__wrapper">
        <div className="ui-popup__top-panel">
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
