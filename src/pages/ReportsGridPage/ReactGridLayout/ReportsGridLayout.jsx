import React from 'react';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import './ReportsGridLayout.scss';
import { connect } from 'react-redux';
import useResizeObserver from '../../../components/UICustomHooks/useResizeObserver/useResizeObserver';
import actions from '../../../redux/actions/actions';
import ReportsGridItem from '../ReportsGridItem/ReportsGridItem';
import UILoader from '../../../components/UILoader/UILoader';

function ReportsGridLayout(props) {
  const {
    parent,
    reports,
    gridLayouts = {},
    reportsGridStoreSetSection,
  } = props || {};

  const { width } = useResizeObserver(parent);

  const firstRender = React.useRef(true);
  const [loading, setLoading] = React.useState(true);

  const onLayoutChange = React.useCallback((layout, layouts) => {
    reportsGridStoreSetSection({
      gridLayouts: layouts,
    });
  }, [reportsGridStoreSetSection]);

  const generateDOM = React.useMemo(() => {
    if (reports && Array.isArray(reports)) {
      return reports.map((v, i) => {
        const {
          x, y, w, h, id,
        } = v || {};
        return (
          <div
            key={id ?? i}
            data-grid={{
              i: id ?? i.toString(),
              x: x ?? 0,
              y: y ?? Infinity,
              w: w ?? 6,
              h: h ?? 5,
            }}
          >
            <ReportsGridItem item={v} />
          </div>
        );
      });
    }
    return null;
  }, [reports]);

  const timeOut = React.useMemo(() => {
    if (reports && Array.isArray(reports)) {
      return reports.length;
    }
    return 0;
  }, [reports]);

  React.useEffect(() => {
    if (firstRender) {
      firstRender.current = false;
      setTimeout(() => setLoading(false), timeOut * 100);
    }
  }, [timeOut]);

  return (
    <>
      {loading && <UILoader type="--google" dimmed />}
      {!loading && (
      <ResponsiveGridLayout
        className="layout"
        layouts={gridLayouts}
        onLayoutChange={onLayoutChange}
        width={width ?? 1210}
        rowHeight={90}
        isBounded
        containerPadding={[10, 10]}
        margin={[15, 15]}
        draggableHandle=".report__header"
      >
        {generateDOM}
      </ResponsiveGridLayout>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  reports: state.reportsGridStore.reports,
  gridLayouts: state.reportsGridStore.gridLayouts,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(ReportsGridLayout);
