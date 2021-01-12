import cn from 'classnames';
import React, { useState, memo, useCallback, useRef, useMemo } from 'react';

import { useEscapeClick, useOutsideClick, usePopupPosition } from '@src/hooks';
import { isDefined } from '@src/utils';

import { Icon } from '@components/Icon';
import { Overlay } from '@components/Overlay';

import { PopupProps } from './types';

import './styles.scss';

function PopupComponent({
  notice = '',
  icon,
  children,
  isCloseable,
  hasTail = true,
  maxWidth,
}: PopupProps) {
  const innerRef = useRef(null);
  const noticeRef = useRef(null);
  const textRef = useRef(null);

  const [isShowNotice, setShowNoticeState] = useState(false);

  const { tailStyle, ...noticeStyle } = usePopupPosition(innerRef, noticeRef, textRef, maxWidth);

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
          {children || (
            <div className="rl-popup__icon">
              {icon || (
                <Icon
                  isCircle
                  name="helpOutline"
                  size="md"
                  isCompact
                  hasRipple
                  isInteractive={isClosable}
                />
              )}
            </div>
          )}
        </div>
        <Overlay in={isShowNotice} duration={150} isMobileOnly>
          <div className="rl-popup__notice" ref={noticeRef} style={noticeStyle}>
            <div className="rl-popup__wrapper">
              <div className="rl-popup__text" ref={textRef}>
                {notice}
              </div>
              {isClosable && (
                <div className="rl-popup__icon">
                  <Icon
                    isCircle
                    className="rl-popup__close"
                    size="md"
                    name="close"
                    onClick={hideNotice}
                  />
                </div>
              )}
              {hasTail && (
                <>
                  <div className="rl-popup__tail rl-popup__tail_bg" style={tailStyle} />
                  <div className="rl-popup__tail rl-popup__tail_border" style={tailStyle} />
                </>
              )}
            </div>
          </div>
        </Overlay>
      </div>
    </div>
  );
}

export const Popup = memo(PopupComponent);
