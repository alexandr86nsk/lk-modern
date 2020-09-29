import RGL from 'react-grid-layout';
import React from 'react';
import './ReportsGridLayout.scss';
import _ from 'lodash';
import useResizeObserver from '../../../components/UICustomHooks/useResizeObserver/useResizeObserver';

function ReportsGridLayout(props) {
  const {
    parent,
  } = props || {};

  const { width } = useResizeObserver(parent);

  const generateLayout = React.useMemo(() => _.map(new Array(20), (item, i) => {
    const y = Math.ceil(Math.random() * 4) + 1;
    return {
      x: (i * 2) % 12,
      y: Math.floor(i / 6) * y,
      w: 2,
      h: y,
      i: i.toString(),
    };
  }), []);

  const [layout, setLayout] = React.useState(generateLayout);

  const handleLayoutChange = React.useCallback((value) => {
    setLayout(value);
  }, []);

  const generateDOM = React.useMemo(() => _.map(_.range(20), (i) => (
    <div key={i}>
      <span className="text">{i}</span>
    </div>
  )), []);

  return (
    <RGL
      layout={layout}
      onLayoutChange={handleLayoutChange}
      isBounded
      width={width ?? 1000}
    >
      {generateDOM}
    </RGL>
  );
}

export default React.memo(ReportsGridLayout);
