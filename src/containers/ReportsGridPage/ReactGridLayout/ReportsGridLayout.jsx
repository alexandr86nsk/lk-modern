import React from 'react';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import './ReportsGridLayout.scss';
import { connect } from 'react-redux';
import useResizeObserver from '../../../components/UICustomHooks/useResizeObserver/useResizeObserver';
import actions from '../../../redux/actions/actions';

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
  } = props || {};

  const { width } = useResizeObserver(parent);

  const stateOriginalLayouts = React.useMemo(() => JSON.parse(JSON.stringify(originalLayouts)), []);

  const [stateLayouts, setStateLayouts] = React.useState(stateOriginalLayouts);

  const onLayoutChange = React.useCallback((layout, layouts) => {
    saveToLS('layouts', layouts);
    setStateLayouts(layouts);
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
              x: x ?? (i + 1) % 2 ? 0 : 6,
              y: y ?? Math.trunc((i + 1) / 3) * 5,
              w: w ?? 6,
              h: h ?? 5,
            }}
          >
            <span className="text">{id ?? i}</span>
          </div>
        );
      });
    }
    return null;
  }, [reports]);

  console.log('layouts', stateLayouts);

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={stateLayouts}
      onLayoutChange={onLayoutChange}
      width={width ?? 1210}
      rowHeight={90}
      isBounded
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
