import { useCallback } from 'react';

import { CallbackEventFunctionType } from '@src/types';

import { useKeyboardObserver } from './useKeyboardObserver';

export function useEscapeClick(callback: CallbackEventFunctionType<KeyboardEvent>) {
  const keyboardClickHandler = useCallback(
    (event) => {
      const { code } = event || {};
      if (code === 'Escape' && callback) {
        callback(event);
      }
    },
    [callback]
  );

  useKeyboardObserver(keyboardClickHandler);
}
