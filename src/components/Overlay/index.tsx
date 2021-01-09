import cn from 'classnames';
import React, { memo, useEffect, useState, ReactElement, useMemo, useCallback } from 'react';

import { defaultValues, screenSizes } from '@src/constants';
import { useBodySizeObserver } from '@src/hooks';
import { isDefined } from '@src/utils';

import { Fade } from '@components/Transitions';

import './style.scss';

export type OverlayProps = {
  /**
   * Дополнительный className для компонента
   */
  className?: string;
  /**
   * Вложенные элементы
   */
  children?: ReactElement | ReactElement[];
  /**
   * Флаг отображения в виде слоя только на мобильных устройствах
   */
  mobileOnly?: boolean;
  /**
   * Флаг для отображения элемента
   */
  in?: boolean;
  /**
   * Длительность анимации появления
   */
  duration?: number;
};

function OverlayComponent({ children, className, mobileOnly, in: inProp, duration }: OverlayProps) {
  const { width: bodyWidth = defaultValues.ZERO } = useBodySizeObserver();
  const [mounted, setMountedState] = useState(false);

  const isMobileDevice = useMemo(() => bodyWidth < screenSizes.NOTEBOOK, [bodyWidth]);
  const hasOverlay = useMemo(
    () => (isDefined(mobileOnly) && isMobileDevice) || !isDefined(mobileOnly),
    [isMobileDevice, mobileOnly]
  );

  useEffect(() => {
    /*if (isDefined(mobileOnly) && isMobileDevice && isDefined(inProp) && inProp) {
      document.body.classList.add('overflow-hidden');
    } else if (isDefined(mobileOnly) && isMobileDevice && isDefined(inProp) && !inProp) {
      document.body.classList.remove('overflow-hidden');
    } else if (!isDefined(mobileOnly) && isDefined(inProp) && inProp) {
      document.body.classList.add('overflow-hidden');
    } else if (!isDefined(mobileOnly) && isDefined(inProp) && !inProp) {
      document.body.classList.remove('overflow-hidden');
    } else */
    setMountedState(true);
    if (!isDefined(inProp)) {
      // document.body.classList.add('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
      setMountedState(false);
    };
  }, [inProp]);

  const onEnteredHandler = useCallback(() => {
    if (hasOverlay) {
      document.body.classList.add('overflow-hidden');
    }
  }, [hasOverlay]);

  const onExitedHandler = useCallback(() => {
    if (hasOverlay) {
      document.body.classList.remove('overflow-hidden');
    }
  }, [hasOverlay]);

  return (
    <Fade
      in={isDefined(inProp) ? inProp : mounted}
      duration={duration}
      unmountOnExit={!isDefined(inProp)}
      onEntered={onEnteredHandler}
      onExited={onExitedHandler}
    >
      {hasOverlay ? (
        <div className={cn('rl-overlay', className)}>{children}</div>
      ) : (
        <div>{children}</div>
      )}
    </Fade>
  );
}

export const Overlay = memo(OverlayComponent);
