import React from 'react';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import './ReportsGridLayout.scss';
import { connect } from 'react-redux';
import useResizeObserver from '../../../components/UICustomHooks/useResizeObserver/useResizeObserver';
import actions from '../../../redux/actions/actions';
import ReportsGridItem from '../ReportsGridItem/ReportsGridItem';

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem('reportsGridLayout')) || {};
    } catch (e) {
      /* Ignore */
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      'reportsGridLayout',
      JSON.stringify({
        [key]: value,
      }),
    );
  }
}

const originalLayouts = getFromLS('layouts') || {};

function ReportsGridLayout(props) {
  const {
    parent,
    reports,
    reportsGridStoreSetReportSection,
  } = props || {};

  const { width } = useResizeObserver(parent);

  const stateOriginalLayouts = React.useMemo(() => JSON.parse(JSON.stringify(originalLayouts)), []);

  const [stateLayouts, setStateLayouts] = React.useState(stateOriginalLayouts);

  const onLayoutChange = React.useCallback((layout, layouts) => {
    saveToLS('layouts', layouts);
    setStateLayouts(layouts);
    reportsGridStoreSetReportSection({

    })
  }, []);

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

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={stateLayouts}
      onLayoutChange={onLayoutChange}
      width={width ?? 1210}
      rowHeight={90}
      isBounded
      margin={[15, 15]}
      draggableHandle=".report__header"
    >
      {generateDOM}
    </ResponsiveGridLayout>
  );
}

const mapStateToProps = (state) => ({
  reports: state.reportsGridStore.reports,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(ReportsGridLayout);
