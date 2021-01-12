import { useIsomorphicLayoutEffect } from '@hooks/useIsomorphicLayoutEffect';

import { CallbackEventFunctionType } from '@src/types';

export function useKeyboardObserver(callback: CallbackEventFunctionType<KeyboardEvent>) {
  useIsomorphicLayoutEffect(() => {
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
