import { RefObject, useEffect } from 'react';

import { CallbackFunctionType } from '@src/types';

export function useOutsideClick(ref: RefObject<HTMLElement>, callback: CallbackFunctionType) {
  useEffect(() => {
    function outsideClickHandler(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (callback) {
          callback();
        }
      }
    }
    document.addEventListener('mousedown', outsideClickHandler);
    return () => {
      document.removeEventListener('mousedown', outsideClickHandler);
    };
  });
}
