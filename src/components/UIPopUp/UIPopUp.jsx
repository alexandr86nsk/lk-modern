import React from 'react';
import './UIPopUp.scss';
import CloseIcon from '../../static/images/close-10px.svg';
import useScrollPage from '../UICustomHooks/useScrollPage/useScrollPage';
import UIScrollToTop from '../UIScrollToTop/UIScrollToTop';
import { motion } from 'framer-motion';

const popup = {
  initial: {
    opacity: 0.5,
    clipPath: "circle(3px at calc(100% - 3em) 3em)",
  },
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at calc(100% - 3em) 3em)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
    opacity: 1,
  }),
  closed: {
    clipPath: "circle(3px at calc(100% - 3em) 3em)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
}

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
      <motion.div
        className={`ui-popup ${type || ''}`}
        variants={popup}
        initial="initial"
        animate="open"
        exit="closed"
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
      </motion.div>
  );
}

export default React.memo(UIPopUp);
