import React from 'react';
import { connect } from 'react-redux';
import actions from '../../../../redux/actions/actions';
import formGenerator from '../../../../components/utilities/formGenerator';
import actualStateFilterTemplate from './settings';

const ActualStateFilter = (props) => {
  const {
    reportsStoreSetSubSection,
    filterUsers,
  } = props || {};

  const handleChangeValue = React.useCallback((editName, editValue) => {
    reportsStoreSetSubSection('actualStateFilter', { [editName]: editValue });
  }, [reportsStoreSetSubSection]);

  return (
    <div className="actual-state-filter">
      {formGenerator(actualStateFilterTemplate, filterUsers, handleChangeValue)}
    </div>
  );
};

const mapStateToProps = (state) => ({
  filterUsers: state.settingsStore.filterUsers,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(ActualStateFilter);
