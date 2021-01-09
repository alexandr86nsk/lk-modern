import React from 'react';
import { connect } from 'react-redux';
import actions from '../../../../redux/actions/actions';
import formGenerator from '../../../../components/utils/formGenerator';
import { callStatisticFilterDataTemplate } from './settings';

const CallStatisticFilter = (props) => {
  const {
    reportsStoreSetSubSection,
    callStatisticFilter,
    briefcases,
    briefcasesLoading,
  } = props || {};

  const handleChangeValue = React.useCallback((editName, editValue) => {
    reportsStoreSetSubSection('callStatisticFilter', { [editName]: editValue });
  }, [reportsStoreSetSubSection]);

  const editedTemplate = React.useMemo(() => {
    if (callStatisticFilterDataTemplate && Array.isArray(callStatisticFilterDataTemplate)) {
      return callStatisticFilterDataTemplate.map((v) => {
        const { dataKey, otherProps } = v || {};
        if (dataKey === 'selectedCallStatisticBriefcase') {
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
    <div className="call-statistic-filter">
      {formGenerator(editedTemplate, callStatisticFilter, handleChangeValue)}
    </div>
  );
};

const mapStateToProps = (state) => ({
  callStatisticFilter: state.reportsStore.callStatisticFilter,
  briefcases: state.reportsStore.briefcases,
  briefcasesLoading: state.reportsStore.briefcasesLoading,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(CallStatisticFilter);
