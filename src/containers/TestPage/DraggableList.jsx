import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Quote from './Quote';

const reorder = (list, startIndex, endIndex) => {
  const result = list;
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const QuoteList = ({ quotes, mainReport }) => quotes.map(
  (quote, index) => (
    <Quote
      key={quote.id}
      mainReport={mainReport}
      quote={quote}
      index={index}
    />
  ),
);

function DraggableList(props) {
  const {
    items,
    mainReport,
    callback,
  } = props;

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const quotes = reorder(
      items,
      result.source.index,
      result.destination.index,
    );
    callback(quotes);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list" direction="horizontal">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            className={`ui-dnd__droppable${snapshot.isDraggingOver ? ' dragging-over' : ' dragging-out'}`}
            {...provided.droppableProps}
          >
            <QuoteList quotes={items} mainReport={mainReport} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default React.memo(DraggableList);
