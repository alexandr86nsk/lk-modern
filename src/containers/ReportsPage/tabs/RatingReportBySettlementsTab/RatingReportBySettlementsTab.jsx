import React from 'react';
import '../../ReportsPage.scss';
import { connect } from 'react-redux';
import actions from '../../../../redux/actions/actions';

function RatingReportBySettlementsTab(props) {
  const { actualState } = props || {};

  return (
    <div className="reports-page__tab rating-report-by-settlements">
      RatingReportBySettlementsTab
    </div>
  );
}

const mapStateToProps = (state) => ({
  actualState: state.reportsStore.actualState,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(RatingReportBySettlementsTab);
