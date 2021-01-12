import { useIsomorphicLayoutEffect } from '@hooks/useIsomorphicLayoutEffect';
import { RefObject } from 'react';

import { defaultValues } from '@src/constants';

const TIME_OUT = 500;

export function useRippleEffect(ref: RefObject<HTMLElement>, isActive?: boolean) {
  useIsomorphicLayoutEffect(() => {
    function clickHandler(event: MouseEvent) {
      if (isActive && ref.current && ref.current?.contains(event.target as Node)) {
        const { left = defaultValues.ZERO, top = defaultValues.ZERO, width = defaultValues.ZERO } =
          ref.current?.getBoundingClientRect() || {};
        const x = event.clientX - left;
        const y = event.clientY - top;
        const w = `${width}`;

        const ripple = document.createElement('span');

        ripple.className = 'ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.setProperty('--scale-ripple', w);

        ref.current?.appendChild(ripple);

        setTimeout(() => {
          ref.current?.removeChild(ripple);
        }, TIME_OUT);
      }
    }

    document.addEventListener('mousedown', clickHandler);
    return () => {
      document.removeEventListener('mousedown', clickHandler);
    };
  });
}
