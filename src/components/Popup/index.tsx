import cn from 'classnames';
import React, { useState, memo, useCallback, useRef, useMemo } from 'react';

import { useEscapeClick, useOutsideClick, usePopupPosition } from '@src/hooks';
import { isDefined } from '@src/utils';

import { Overlay } from '@components/Overlay';

import CloseIcon from './icons/close-icon.svg';
import HintIcon from './icons/hint-icon.svg';
import { PopupProps } from './types';

import './styles.scss';

function PopupComponent({ notice = '', icon, children, isCloseable }: PopupProps) {
  const innerRef = useRef(null);
  const noticeRef = useRef(null);

  const [isShowNotice, setShowNoticeState] = useState(false);

  const noticeStyle = usePopupPosition(innerRef, noticeRef);

  const isMobileDevice = useMemo(() => {
    const { width } = noticeStyle || {};
    return !isDefined(width);
  }, [noticeStyle]);

  const isClosable = useMemo(() => {
    return isCloseable || isMobileDevice;
  }, [isCloseable, isMobileDevice]);

  const hideNotice = useCallback(() => {
    setShowNoticeState(false);
  }, []);

  const showNotice = useCallback(() => {
    setShowNoticeState(true);
  }, []);

  useEscapeClick(hideNotice);
  useOutsideClick(innerRef, hideNotice);

  const onContainerMouseEnterHandler = useCallback(() => {
    if (!isClosable) {
      showNotice();
    }
  }, [isClosable, showNotice]);

  const onContainerMouseLeaveHandler = useCallback(() => {
    if (!isClosable) {
      hideNotice();
    }
  }, [isClosable, hideNotice]);

  const onContainerClickHandler = useCallback(() => {
    if (isClosable) {
      setShowNoticeState((prev) => !prev);
    }
  }, [isClosable]);

  return (
    <div className={cn('rl-popup', { 'rl-popup_type_closeable': isCloseable })}>
      <div className="rl-popup__inner" ref={innerRef}>
        <div
          role="presentation"
          className="rl-popup__container"
          onClick={onContainerClickHandler}
          onMouseEnter={onContainerMouseEnterHandler}
          onMouseLeave={onContainerMouseLeaveHandler}
        >
          {children || <div className="rl-popup__icon">{icon || <HintIcon />}</div>}
        </div>
        <Overlay in={isShowNotice} duration={150} isMobileOnly>
          <div className="rl-popup__notice" ref={noticeRef} style={noticeStyle}>
            <div className="rl-popup__text">{notice}</div>
            {isClosable && <CloseIcon className="rl-popup__close" onClick={hideNotice} />}
          </div>
        </Overlay>
      </div>
    </div>
  );
}

export const Popup = memo(PopupComponent);
