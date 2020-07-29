import React from 'react';
import './UITab.scss';
import { Tab } from 'semantic-ui-react';

function UITab(props) {
  const {
    tabs = [],
    renderActiveOnly,
  } = props || {};

  const panes = React.useMemo(() => {
    if (renderActiveOnly) {
      return tabs.map((v) => (
        {
          menuItem: v.title,
          render: () => <Tab.Pane attached={false}>{v.item}</Tab.Pane>,
        }
      ));
    }
    return tabs.map((v) => (
      {
        menuItem: v.title,
        pane: <Tab.Pane attached={false} key={v.title}>{v.item}</Tab.Pane>,
      }
    ));
  }, [renderActiveOnly, tabs]);

  return (
    <div className="ui-tab">
      <Tab panes={panes} renderActiveOnly={renderActiveOnly} />
    </div>
  );
}

export default React.memo(UITab);
