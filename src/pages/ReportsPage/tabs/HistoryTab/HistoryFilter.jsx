import React from 'react';
import { connect } from 'react-redux';
import actions from '../../../../redux/actions/actions';
import formGenerator from '../../../../components/utilities/formGenerator';
import historyFilterDataTemplate from './settings';

const HistoryFilter = (props) => {
  const {
    reportsStoreSetSubSection,
    historyFilter,
    briefcases,
    briefcasesLoading,
  } = props || {};

  const handleChangeValue = React.useCallback((editName, editValue) => {
    reportsStoreSetSubSection('historyFilter', { [editName]: editValue });
  }, [reportsStoreSetSubSection]);

  const editedTemplate = React.useMemo(() => {
    if (historyFilterDataTemplate && Array.isArray(historyFilterDataTemplate)) {
      return historyFilterDataTemplate.map((v) => {
        const { dataKey, otherProps } = v || {};
        if (dataKey === 'selectedHistoryBriefcase') {
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
    <div className="history-filter">
      {formGenerator(editedTemplate, historyFilter, handleChangeValue)}
    </div>
  );
};

const mapStateToProps = (state) => ({
  historyFilter: state.reportsStore.historyFilter,
  briefcases: state.reportsStore.briefcases,
  briefcasesLoading: state.reportsStore.briefcasesLoading,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(HistoryFilter);
