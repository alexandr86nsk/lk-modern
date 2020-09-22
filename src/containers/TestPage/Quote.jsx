import { Draggable } from 'react-beautiful-dnd';
import { Rnd } from 'react-rnd';
import { connect } from 'react-redux';
import React from 'react';
import actions from '../../redux/actions/actions';
import Report from './Report';


function Quote(props) {
  const { quote, index, mainReport, testPageStoreUpdateReport } = props;
  if (quote.type) {
    return (
      <Draggable draggableId={quote.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            className={`ui-dnd__draggable${snapshot.isDragging ? ' dragging' : ''}`}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Report item={quote} active={quote.id === mainReport} />
          </div>
        )}
      </Draggable>
    );
  }
  return (
    <Rnd
      key={quote.id}
      bounds=".page"
      dragHandleClassName="report__header-title"
      size={{
        width: quote && quote.width ? quote.width : 600,
        height: quote && quote.height ? quote.height : 400,
      }}
      minWidth={200}
      minHeight={200}
      position={{
        x: quote && quote.x ? quote.x : 0,
        y: quote && quote.y ? quote.y : 40,
      }}
      onDragStop={(e, d) => {
        testPageStoreUpdateReport({
          id: quote.id,
          x: d.x,
          y: d.y,
        });
      }}
      onResize={(e, direction, ref, delta, position) => {
        testPageStoreUpdateReport({
          id: quote.id,
          width: ref.offsetWidth,
          height: ref.offsetHeight,
          ...position,
        });
      }}
    >
      <Report item={quote} />
    </Rnd>
  );
}

const mapDispatchToProps = { ...actions };

export default connect(null, mapDispatchToProps)(Quote);
