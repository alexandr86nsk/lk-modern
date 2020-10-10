import React from 'react';

function useKeyboardObserver(callback) {
  React.useEffect(() => {
    function handlePressKey(event) {
      if (callback) {
        callback(event);
      }
    }
    document.addEventListener('keydown', handlePressKey);
    return () => {
      document.removeEventListener('keydown', handlePressKey);
    };
  });

  return null;
}

export default useKeyboardObserver;
