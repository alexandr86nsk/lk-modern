import React from 'react';
import './UIBlockDraggable.scss';


function UIBlockDraggable(props) {
  const {
    children,
    style,
    startPosLeft = 'unset',
    startPosTop = 'unset',
    draggableRef,
  } = props;

  const mainEl = React.useRef(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [dragging, setDragging] = React.useState(false);
  const [rel, setRel] = React.useState(null);

  React.useEffect(() => {
    function handleMouseMove(e) {
      if (!dragging) return;
      setPosition({
        x: e.pageX - rel.x,
        y: e.pageY - rel.y,
      });
      e.stopPropagation();
      e.preventDefault();
    }
    function handleMouseUp(e) {
      setDragging(false);
      e.stopPropagation();
      e.preventDefault();
    }
    function handleMouseDown(e) {
      if (e.button !== 0) return;
      if (draggableRef.current && mainEl.current && draggableRef.current.contains(e.target)) {
        const pos = {
          top: mainEl.current.offsetTop,
          left: mainEl.current.offsetLeft,
        };
        setDragging(true);
        setRel({
          x: e.pageX - pos.left,
          y: e.pageY - pos.top,
        });
        e.stopPropagation();
        e.preventDefault();
      }
    }
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  });

  return (
    <div className="ui-block-draggable">
      <div className="ui-block-draggable__body">
        <div
          className="ui-block-draggable__item"
          ref={mainEl}
          style={{
            left: `${position.x ? `${position.x}px` : startPosLeft}`,
            top: `${position.y ? `${position.y}px` : startPosTop}`,
            ...style,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default UIBlockDraggable;
