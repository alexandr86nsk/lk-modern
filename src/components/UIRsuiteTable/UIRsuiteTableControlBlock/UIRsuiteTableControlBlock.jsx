import React from 'react';
import './UIRsuiteTableControlBlock.scss';
import UISelect from '../../UISelect/UISelect';
import numberOfItemsToPageOptions from '../common/numberOfItemsToPageOptions';
import UISearch from '../../UISearch/UISearch';
import RefreshIcon from './refresh-icon.svg';
import FilterIcon from './filter-icon.svg';
import UIRsuiteTableFilter from '../UIRsuiteTableFilter/UIRsuiteTableFilter';

function UIRsuiteTableControlBlock(props) {
  const {
    pagination,
    paginationNumberOfItemsToPage,
    paginationSetNumberOfItemsToPage,
    paginationTotalItems,
    filter,
    filterSelectedItemsCount,
    filterBody,
    filterClearCallback,
    filterType,
    filterBodyTitle,
    search,
    searchPlaceholder,
    searchString,
    searchSetString,
    searchCustom,
    refresh,
    refreshCallback,
    refreshTitle,
  } = props || {};

  return (
    <>
      <div className="control-block__left-side">
        {pagination && (
        <div className="number-items">
          <div className="select-wrapper">
            <span>Кол-во:</span>
            <UISelect
              options={numberOfItemsToPageOptions}
              selected={paginationNumberOfItemsToPage}
              callback={paginationSetNumberOfItemsToPage}
            />
            {paginationTotalItems > 0
             && (
               <div className="total-records">
                 {`из ${paginationTotalItems}`}
               </div>
             )}
          </div>
        </div>
        )}
      </div>
      <div className="control-block__right-side">
        {filter && (
          <UIRsuiteTableFilter
            filterIcon={<FilterIcon />}
            filterBody={filterBody}
            filterSelectedItemsCount={filterSelectedItemsCount}
            filterClearCallback={filterClearCallback}
            filterType={filterType}
            filterBodyTitle={filterBodyTitle}
          />
        )}
        {search && !searchCustom && (
          <div className="search-wrapper">
            <UISearch
              hideResults
              callback={searchSetString}
              data={searchString}
              placeholder={searchPlaceholder}
            />
          </div>
        )}
        {refresh && (
          <div
            title="Обновить таблицу"
            role="presentation"
            className={`refresh-wrapper${refreshTitle ? ' --with-title' : ''}`}
            onClick={refreshCallback}
          >
            <RefreshIcon />
            {refreshTitle && <span>{refreshTitle}</span>}
          </div>
        )}
      </div>
      {search && searchCustom && (
      <div className="control-block__bottom-side">
        {searchCustom}
      </div>
      )}
    </>
  );
}

export default React.memo(UIRsuiteTableControlBlock);
