import cn from 'classnames';
import React, { ReactElement, useState, memo, useCallback, useRef, useMemo } from 'react';

import { useOutsideClick, usePopupPosition } from '@src/hooks';
import { isDefined } from '@src/utils';

import { Overlay } from '@components/Overlay';

import CloseIcon from './icons/close-icon.svg';
import HintIcon from './icons/hint-icon.svg';

import './styles.scss';

export type PopupProps = {
  /**
   * Содержимое подсказки
   */
  notice?: string | ReactElement | ReactElement[];
  /**
   * Иконка подсказки
   */
  icon?: ReactElement;
  /**
   * Внутренние элементы
   */
  children?: ReactElement | string;
  /**
   * Флаг заменяет событие hover на click и добавляет кнопку закрыть
   */
  closeable?: boolean;
};

function PopupComponent({ notice = '', icon, children, closeable }: PopupProps) {
  const innerRef = useRef(null);
  const noticeRef = useRef(null);

  const [isNoticeShow, setNoticeShowState] = useState(false);

  const noticeStyle = usePopupPosition(innerRef, noticeRef);

  const isMobileDevice = useMemo(() => {
    const { width } = noticeStyle || {};
    return !isDefined(width);
  }, [noticeStyle]);

  const isClosable = useMemo(() => {
    return closeable || isMobileDevice;
  }, [closeable, isMobileDevice]);

  const hideNotice = useCallback(() => {
    setNoticeShowState(false);
  }, []);

  const showNotice = useCallback(() => {
    setNoticeShowState(true);
  }, []);

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
      setNoticeShowState((prev) => !prev);
    }
  }, [isClosable]);

  return (
    <div className={cn('rl-popup', { 'rl-popup_type_closeable': closeable })}>
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
        <Overlay in={isNoticeShow} duration={150} mobileOnly>
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
