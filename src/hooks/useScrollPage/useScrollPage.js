import React from 'react';


function useScrollPage(callback, ref) {
  React.useEffect(() => {
    function handleScroll(e) {
      if (e.target.contains(ref.current) && e.target.scrollTop > 400) {
        callback(true);
      } else {
        callback(false);
      }
    }
    document.addEventListener('scroll', handleScroll, true);
    return () => {
      document.removeEventListener('scroll', handleScroll, true);
    };
  });

  return null;
}

export default useScrollPage;
