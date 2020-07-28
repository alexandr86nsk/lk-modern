import React from 'react';

function useHookWithRefCallback(callback) {
  const [node, setRef] = React.useState(null);

  React.useEffect(
    () => {
      if (node && callback) {
        callback(node);
      }
    },
    [callback, node],
  );

  return [setRef];
}

export default useHookWithRefCallback;
