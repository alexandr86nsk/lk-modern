import cn from 'classnames';
import React, { memo, useEffect, useState, useMemo, useCallback } from 'react';

import { defaultValues, screenSizes } from '@src/constants';
import { useBodySizeObserver } from '@src/hooks';
import { isDefined } from '@src/utils';

import { TransitionEffect } from '@components/TransitionEffect';

import { OverlayProps } from './types';

import './styles.scss';

const OverlayComponent = ({
  children,
  className,
  isOnlyInMobile,
  in: inProp,
  duration,
}: OverlayProps) => {
  const { width: bodyWidth = defaultValues.ZERO } = useBodySizeObserver();
  const [mounted, setMountedState] = useState(false);

  const isMobileDevice = useMemo(() => bodyWidth < screenSizes.NOTEBOOK, [bodyWidth]);
  const hasOverlay = useMemo(
    () =>
      !isDefined(isOnlyInMobile) || (isDefined(isOnlyInMobile) && isOnlyInMobile && isMobileDevice),
    [isMobileDevice, isOnlyInMobile]
  );

  useEffect(() => {
    setMountedState(true);
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
    <TransitionEffect
      animation="fade"
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
    </TransitionEffect>
  );
};

export const Overlay = memo(OverlayComponent);
