import React from 'react';
import './UIContextMenu.scss';

function UIContextMenu(props) {
  const {
    type = '',
    body = 'Вы действительно хотите это сделать?',
    posTop,
    posLeft,
    hideCallback,
  } = props;

  const elRef = React.useRef(null);

  React.useEffect(() => {
    function handleClickEscape(event) {
      if (event.key === 'Escape') {
        if (hideCallback) {
          hideCallback();
        }
      }
    }
    function handleClickMouse(event) {
      if (elRef.current && !elRef.current.contains(event.target)) {
        if (hideCallback) {
          setTimeout(() => hideCallback(), 200);
        }
      }
    }
    document.addEventListener('keydown', handleClickEscape);
    document.addEventListener('mouseup', handleClickMouse);
    return () => {
      document.removeEventListener('keydown', handleClickEscape);
      document.addEventListener('mouseup', handleClickMouse);
    };
  }, [hideCallback]);

  return (
    <div
      ref={elRef}
      className={`ui-context-menu ${type}`}
      style={{
        top: `${posTop}px`,
        left: `${posLeft}px`,
      }}
    >
      {body}
    </div>
  );
}

export default React.memo(UIContextMenu);
