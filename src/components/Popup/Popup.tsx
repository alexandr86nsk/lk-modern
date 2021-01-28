import cn from 'classnames';
import React, { useState, memo, useCallback, useRef, useMemo } from 'react';

import { useEscapeClick, useOutsideClick, usePopupPosition } from '@src/hooks';
import { isDefined } from '@src/utils';

import { Button } from '@components/Button';
import { Icon } from '@components/Icon/Icon';
import { Overlay } from '@components/Overlay/Overlay';

import { PopupProps } from './types';

import './styles.scss';

const OVERLAY_DURATION = 150;

const PopupComponent = ({
  notice,
  icon,
  children,
  isCloseable,
  hasTail = true,
  maxWidth,
  className,
  in: inProp,
  isOverlayInMobile = true,
}: PopupProps) => {
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

  const memoizedInStatus = useMemo(() => {
    return isDefined(inProp) ? inProp : isShowNotice;
  }, [inProp, isShowNotice]);

  const hideNotice = useCallback(() => {
    setShowNoticeState(false);
  }, []);

  const showNotice = useCallback(() => {
    setShowNoticeState(true);
  }, []);

  useEscapeClick(hideNotice);
  useOutsideClick(innerRef, hideNotice);

  const onContainerMouseEnterHandler = useCallback(() => {
    if (!isClosable && !isDefined(inProp)) {
      showNotice();
    }
  }, [inProp, isClosable, showNotice]);

  const onContainerMouseLeaveHandler = useCallback(() => {
    if (!isClosable && !isDefined(inProp)) {
      hideNotice();
    }
  }, [inProp, isClosable, hideNotice]);

  const onContainerClickHandler = useCallback(() => {
    if (isClosable && !isDefined(inProp)) {
      setShowNoticeState((prev) => !prev);
    }
  }, [inProp, isClosable]);

  return (
    <div
      className={cn('rl-popup', className, {
        'rl-popup_type_closeable': isCloseable,
      })}
    >
      <div className="rl-popup__inner" ref={innerRef}>
        <div
          role="presentation"
          className="rl-popup__container"
          onClick={onContainerClickHandler}
          onMouseEnter={onContainerMouseEnterHandler}
          onMouseLeave={onContainerMouseLeaveHandler}
        >
          {children || <Icon name={icon || 'helpOutline'} isCircular />}
        </div>
        <Overlay
          in={memoizedInStatus}
          duration={OVERLAY_DURATION}
          isOnlyInMobile={isOverlayInMobile}
        >
          <div className="rl-popup__notice" ref={noticeRef} style={noticeStyle}>
            <div className="rl-popup__wrapper">
              <div className="rl-popup__text" ref={textRef}>
                {notice}
              </div>
              {isClosable && (
                <div className="rl-popup__icon">
                  <Button
                    className="rl-popup__close"
                    icon="close"
                    onClick={hideNotice}
                    isCircular
                    isGhost
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
};

export const Popup = memo(PopupComponent);
