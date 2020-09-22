import React from 'react';
import { connect } from 'react-redux';
import './ReportsPage.scss';
import actions from '../../redux/actions/actions';
import UIBlockTitle from '../../components/UIBlockTitle/UIBlockTitle';
import UITab from '../../components/UITab/UITab';
import reportsTabs from './settings';


function ReportsPage(props) {
  const {
    reportsStoreGetBriefcases,
    reportsStoreGetBriefcasesCancel,
    reportsStoreClear,
  } = props;

  React.useEffect(() => {
    reportsStoreGetBriefcases();
  }, [reportsStoreGetBriefcases]);

  React.useEffect(() => () => {
    reportsStoreGetBriefcasesCancel();
    reportsStoreClear();
  }, [reportsStoreGetBriefcasesCancel, reportsStoreClear]);

  return (
    <div className="reports-page page__content">
      <UIBlockTitle title="Мониторинг" />
      <UITab
        tabs={reportsTabs}
        renderActiveOnly
      />
    </div>
  );
}

const mapDispatchToProps = { ...actions };

export default connect(null, mapDispatchToProps)(ReportsPage);
