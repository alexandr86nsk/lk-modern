import React from 'react';
import RGL from 'react-grid-layout';
import './ReportsGridLayout.scss';
import { connect } from 'react-redux';
import useResizeObserver from '../../../components/UICustomHooks/useResizeObserver/useResizeObserver';
import actions from '../../../redux/actions/actions';

function ReportsGridLayout(props) {
  const {
    parent,
    reports,
  } = props || {};

  const { width } = useResizeObserver(parent);

  const [mounted, setMounted] = React.useState(false);

  const generateLayout = React.useMemo(() => {
    if (reports && Array.isArray(reports)) {
      return reports.map((v, i) => {
        const {
          x, y, w, h, id,
        } = v || {};
        const randomY = Math.ceil(Math.random() * 4) + 1;
        return {
          x: x ?? (i * 2) % 12,
          y: y ?? Math.floor(i / 6) * randomY,
          w: w ?? 6,
          h: h ?? randomY,
          i: id ?? i.toString(),
        };
      });
    }
    return null;
  }, [reports]);

  const [layout, setLayout] = React.useState(generateLayout);

  const handleLayoutChange = React.useCallback((value) => {
    setLayout(value);
  }, []);

  const generateDOM = React.useMemo(() => {
    if (reports && Array.isArray(reports)) {
      return reports.map((v, i) => {
        const { id } = v || {};
        return (
          <div key={id ?? i}>
            <span className="text">{i}</span>
          </div>
        );
      });
    }
    return null;
  }, [reports]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <RGL
      layout={layout}
      onLayoutChange={handleLayoutChange}
      isBounded
      width={width ?? 1000}
      rowHeight={30}
    >
      {generateDOM}
    </RGL>
  );
}

const mapStateToProps = (state) => ({
  reports: state.reportsGridStore.reports,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(ReportsGridLayout);
