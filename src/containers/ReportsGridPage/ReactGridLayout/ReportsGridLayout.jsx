import React from 'react';
import { Responsive } from 'react-grid-layout';
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
              w: w ?? 5,
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
    <Responsive
      className="layout"
      layouts={stateLayouts}
      cols={{
        lg: 12, md: 10, sm: 6, xs: 4, xxs: 2,
      }}
      onLayoutChange={onLayoutChange}
      width={width ?? 1200}
      rowHeight={90}
      isBounded
    >
      {generateDOM}
    </Responsive>
  );
}

const mapStateToProps = (state) => ({
  reports: state.reportsGridStore.reports,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(ReportsGridLayout);
