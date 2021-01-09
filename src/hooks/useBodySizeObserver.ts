import { useRef } from 'react';

import { useResizeObserver } from './useResizeObserver';

export function useBodySizeObserver() {
  const body = useRef(document.body);

  return useResizeObserver(body);
}
