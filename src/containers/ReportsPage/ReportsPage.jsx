import React from 'react';
import { connect } from 'react-redux';
import './ReportsPage.scss';
import actions from '../../redux/actions/actions';
import UIBlockTitle from '../../components/UIBlockTitle/UIBlockTitle';
import UITab from '../../components/UITab/UITab';
import reportsTabs from './settings';

function ReportsPage() {
  // const {} = props || {};

  React.useEffect(() => {
    console.log('mount');
  }, []);

  React.useEffect(() => () => {
    console.log('unmount');
  }, []);

  return (
    <div className="reports-page page__content">
      <UIBlockTitle title="Отчетность" />
      <UITab
        tabs={reportsTabs}
        renderActiveOnly
      />
    </div>
  );
}

const mapDispatchToProps = { ...actions };

export default connect(null, mapDispatchToProps)(ReportsPage);
