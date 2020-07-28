import React from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions/actions';
import { itemHeader } from './settings';
import UITable from '../../components/UITable/UITable';
import history from '../../history/history';
import UIBlockTitle from '../../components/UIBlockTitle/UIBlockTitle';
import UILoader from '../../components/UILoader/UILoader';


function BriefcaseItemPage(props) {
  const {
    id,
    dataLoaded,
    tableDataLoaded,
    title,
    items,
    path,
    briefcaseItemStatuses,
    briefcaseItemResults,
    briefcaseStoreGetBriefcase,
    briefcaseStoreGetBriefcaseCancel,
    briefcaseItemStoreClear,
    pageControlStoreSet,
    pageControlStoreClear,
    briefcaseItemStoreSetSection,
    briefcaseItemTableSearchString,
  } = props;

  React.useEffect(() => {
    const itemId = path.split('/')[2] || '';
    if (itemId) {
      briefcaseStoreGetBriefcase(itemId);
    }
  }, [briefcaseStoreGetBriefcase, path]);

  const handleBackClick = React.useCallback(() => {
    history.push('/briefcase');
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      pageControlStoreSet({
        show: true,
        data: {
          actions: {
            back: handleBackClick,
          },
        },
      });
    }, 200);
  }, [handleBackClick, pageControlStoreSet]);

  const handleRefreshTable = React.useCallback(() => {
    if (id) {
      briefcaseStoreGetBriefcase(id);
    }
  }, [id, briefcaseStoreGetBriefcase]);

  React.useEffect(() => () => {
    briefcaseStoreGetBriefcaseCancel();
    briefcaseItemStoreClear();
    pageControlStoreClear();
  }, [
    briefcaseStoreGetBriefcaseCancel,
    briefcaseItemStoreClear,
    pageControlStoreClear,
  ]);

  const editedItemHeader = React.useMemo(
    () => itemHeader.map((v) => {
      if (v.id === 0) {
        return ({
          ...v,
          options: briefcaseItemStatuses,
        });
      }
      if (v.id === 1) {
        return ({
          ...v,
          options: briefcaseItemResults,
        });
      }
      return v;
    }),
    [briefcaseItemStatuses, briefcaseItemResults],
  );

  const handleSearch = React.useCallback((value) => {
    briefcaseItemStoreSetSection({ briefcaseItemTableSearchString: value });
  }, [briefcaseItemStoreSetSection]);

  return (
    <div className="briefcase-item page__content">
      {!dataLoaded ? <UILoader text="Загрузка" size="large" /> : (
        <>
          <UIBlockTitle title={title} />
          <UITable
            header={editedItemHeader}
            customId="BriefcaseItemId"
            data={items}
            empty="Список пуст"
            loadingData={!tableDataLoaded}
            pagination
            refresh
            refreshCallback={handleRefreshTable}
            search
            sortable
            selectable
            searchString={briefcaseItemTableSearchString}
            searchCallback={handleSearch}
          />
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  dataLoaded: state.briefcaseItemStore.dataLoaded,
  id: state.briefcaseItemStore.BriefcaseId,
  tableDataLoaded: state.briefcaseItemStore.tableDataLoaded,
  items: state.briefcaseItemStore.items,
  title: state.briefcaseItemStore.Title,
  briefcaseItemTableSearchString: state.briefcaseItemStore.briefcaseItemTableSearchString,
  briefcaseItemResults: state.referencesStore.briefcaseItemResults,
  briefcaseItemStatuses: state.referencesStore.briefcaseItemStatuses,
  path: state.router.location.pathname,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(BriefcaseItemPage);
