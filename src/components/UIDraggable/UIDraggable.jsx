import React from 'react';
import './UIDraggable.scss';


function UIDraggable(props) {
  const {
    children,
    style,
    startPosLeft = 'unset',
    startPosTop = 'unset',
  } = props;

  const draggableEl = React.useRef(null);
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
      if (draggableEl.current && draggableEl.current.contains(e.target)) {
        const pos = {
          top: draggableEl.current.offsetTop,
          left: draggableEl.current.offsetLeft,
        };
        setDragging(true);
        setRel({
          x: e.pageX - pos.left,
          y: e.pageY - pos.top,
        });
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
    <div className="ui-draggable">
      <div className="ui-draggable__body">
        <div
          className="ui-draggable__item"
          ref={draggableEl}
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

export default UIDraggable;
