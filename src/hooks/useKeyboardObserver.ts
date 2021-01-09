import { useEffect } from 'react';

import { CallbackEventFunctionType } from '@src/types';

export function useKeyboardObserver(callback: CallbackEventFunctionType<KeyboardEvent>) {
  useEffect(() => {
    function handlePressKey(event: KeyboardEvent) {
      if (callback) {
        callback(event);
      }
    }
    document.addEventListener('keydown', handlePressKey);
    return () => {
      document.removeEventListener('keydown', handlePressKey);
    };
  });
}
