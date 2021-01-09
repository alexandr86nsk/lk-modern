import React from 'react';
import { connect } from 'react-redux';
import actions from '../../../../redux/actions/actions';
import formGenerator from '../../../../components/utils/formGenerator';
import { actualStateFilterDataTemplate } from './settings';

const ActualStateFilter = (props) => {
  const {
    reportsStoreSetSubSection,
    actualStateFilter,
    briefcases,
    briefcasesLoading,
  } = props || {};

  const handleChangeValue = React.useCallback((editName, editValue) => {
    reportsStoreSetSubSection('actualStateFilter', { [editName]: editValue });
  }, [reportsStoreSetSubSection]);

  const editedTemplate = React.useMemo(() => {
    if (actualStateFilterDataTemplate && Array.isArray(actualStateFilterDataTemplate)) {
      return actualStateFilterDataTemplate.map((v) => {
        const { dataKey, otherProps } = v || {};
        if (dataKey === 'selectedActualStateBriefcase') {
          return {
            ...v,
            otherProps: {
              ...otherProps,
              options: briefcases,
              loading: briefcasesLoading,
            },
          };
        }
        return v;
      });
    }
    return [];
  }, [briefcases, briefcasesLoading]);

  return (
    <div className="actual-state-filter">
      {formGenerator(editedTemplate, actualStateFilter, handleChangeValue)}
    </div>
  );
};

const mapStateToProps = (state) => ({
  actualStateFilter: state.reportsStore.actualStateFilter,
  briefcases: state.reportsStore.briefcases,
  briefcasesLoading: state.reportsStore.briefcasesLoading,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(ActualStateFilter);
