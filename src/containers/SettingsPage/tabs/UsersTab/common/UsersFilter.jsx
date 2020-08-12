import React from 'react';
import { connect } from 'react-redux';
import actions from '../../../../../redux/actions/actions';
import formGenerator from '../../../../../components/utilities/formGenerator';
import { usersFilterTemplate } from '../settings';

const UsersFilter = (props) => {
  const {
    settingsStoreSetSubSection,
    filterUsers,
  } = props || {};

  const handleChangeValue = React.useCallback((editName, editValue) => {
    settingsStoreSetSubSection('filterUsers', { [editName]: editValue });
  }, [settingsStoreSetSubSection]);

  return (
    <div className="users-filter">
      {formGenerator(usersFilterTemplate, filterUsers, handleChangeValue)}
    </div>
  );
};

const mapStateToProps = (state) => ({
  filterUsers: state.settingsStore.filterUsers,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(UsersFilter);
