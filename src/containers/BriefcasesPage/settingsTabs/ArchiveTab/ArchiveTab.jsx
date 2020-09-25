import React from 'react';
import { connect } from 'react-redux';
import actions from '../../../../redux/actions/actions';

function ArchiveTab() {
  return (
    <div className="archive-tab">
      Архив
    </div>
  );
}

const mapStateToProps = (state) => ({
  queuePhone: state.briefcasesStore.queuePhone,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(ArchiveTab);
