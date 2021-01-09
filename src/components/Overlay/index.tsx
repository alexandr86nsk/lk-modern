import cn from 'classnames';
import React, {
  memo,
  useEffect,
  ReactElement,
  /*Children,
  isValidElement,
  cloneElement,*/
} from 'react';

import './style.scss';
import { defaultValues, screenSizes } from '@src/constants';
import { useBodySizeObserver } from '@src/hooks';
import { isDefined } from '@src/utils';

import { Fade } from '@components/Transitions';

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

  const isMobileDevice = bodyWidth < screenSizes.NOTEBOOK;

  useEffect(() => {
    if (isDefined(mobileOnly) && isMobileDevice && inProp) {
      document.body.classList.add('overflow-hidden');
    } else if (isDefined(mobileOnly) && isMobileDevice && !inProp) {
      document.body.classList.remove('overflow-hidden');
    } else if (!isDefined(mobileOnly)) {
      document.body.classList.add('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [mobileOnly, isMobileDevice, inProp]);

  return (
    <Fade in={inProp} duration={duration}>
      {(isDefined(mobileOnly) && isMobileDevice) || !isDefined(mobileOnly) ? (
        <div className={cn('rl-overlay', className)}>{children}</div>
      ) : (
        <div>{children}</div>
      )}
    </Fade>
  );
}

export const Overlay = memo(OverlayComponent);
