import { useIsomorphicLayoutEffect } from '@hooks/useIsomorphicLayoutEffect';
import { useState, useRef, RefObject } from 'react';

import { defaultValues } from '@src/constants';
import { isNotNil } from '@src/utils';

export type UseResizeObserver = {
  width?: number;
  height?: number;
  innerWidth?: number;
  innerHeight?: number;
};

export function useResizeObserver(resizeSubject: RefObject<Element>): UseResizeObserver {
  const [contentRect, setContentRect] = useState<UseResizeObserver | null>(null);
  const resizeObserver = useRef<ResizeObserver | null>(null);

  useIsomorphicLayoutEffect(() => {
    function observe(RO: typeof ResizeObserver) {
      resizeObserver.current = new RO((entries) => {
        const obs = entries[defaultValues.ZERO];
        const { width, height } = obs?.contentRect || {};
        const { blockSize, inlineSize }: ResizeObserverSize = isNotNil(obs?.borderBoxSize)
          ? obs.borderBoxSize[defaultValues.ZERO]
          : { blockSize: 0, inlineSize: 0 };
        setContentRect({
          width: inlineSize,
          height: blockSize,
          innerWidth: width,
          innerHeight: height,
        });
      });

      if (resizeSubject.current) {
        resizeObserver.current?.observe(resizeSubject.current);
      }
    }

    if ('ResizeObserver' in window) {
      observe(ResizeObserver);
    } else {
      import('resize-observer-polyfill').then((lazy) => {
        const { default: RO } = lazy || {};
        observe(RO);
      });
    }

    return disconnect;
  }, [resizeSubject]);

  function disconnect() {
    resizeObserver.current?.disconnect();
  }

  return contentRect || {};
}
