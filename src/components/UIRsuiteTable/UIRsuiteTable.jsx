import React from 'react';
import './UIRsuiteTable.scss';
import * as moment from 'moment';
import sortBy from 'lodash/sortBy';
import UIPagination from '../UIPagination/UIPagination';
import UIRsuiteTableControlBlock from './UIRsuiteTableControlBlock/UIRsuiteTableControlBlock';
import UIRsuiteTableBody from './UIRsuiteTableBody/UIRsuiteTableBody';

function UIRsuiteTable(props) {
  const {
    tableStore,
    tableStoreSetSection,
    tableTemplateSetSection,
    tableData = [],
    tableTemplate,
  } = props || {};

  const {
    customId,
    tableEmptyMessage,
    tableLoadingMessage,
    actions,
    onRowClick,
    onRowDoubleClick,
    pagination,
    paginationPageNeighbours,
    paginationCurrentPage = 1,
    paginationNumberOfItemsToPage,
    paginationTotalItems,
    filter,
    filterClearCallback,
    filterSelectedItemsCount,
    filterBody,
    filterType,
    filterBodyTitle,
    search,
    searchPlaceholder,
    searchString,
    searchCustom,
    refresh,
    refreshCallback,
    refreshTitle,
    contextMenu,
    readOnly,
    sortSortingValue,
    tableLoading,
    tableHeaderHeight,
    tableRowHeight,
    tableVirtualized,
    tableIsResizable,
    tableIsWordWrap,
    paginationServerSide,
    searchServerSide,
    sortServerSide,
    loading,
    type,
  } = tableStore || {};

  const tableBodyRef = React.useRef(null);
  const [tableBodySize, setTableBodySize] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    const { current } = tableBodyRef || {};
    if (current) {
      setTableBodySize({
        width: current.offsetWidth,
        height: current.offsetHeight,
      });
    }
  }, []);

  React.useEffect(() => {
    if (searchString) {
      tableStoreSetSection({
        paginationCurrentPage: 1,
      });
    }
  }, [tableStoreSetSection, searchString]);

  const memoizedTableTemplate = React.useMemo(() => {
    if (tableTemplate && Array.isArray(tableTemplate)) {
      const nonWidthCells = tableTemplate.filter((v) => !v.width || v.width === 0).length;
      if (nonWidthCells) {
        const usedWidth = tableTemplate.reduce((acc, v) => (v.width ? acc + v.width : acc), 0);
        return tableTemplate.map((v) => {
          if (!v.width) {
            const w = (tableBodySize.width - 2 - usedWidth) / nonWidthCells;
            return {
              ...v,
              width: w < 90 ? 90 : w,
            };
          }
          return v;
        });
      }
      return tableTemplate;
    }
    return null;
  }, [tableBodySize, tableTemplate]);

  React.useEffect(() => {
    const { current } = tableBodyRef || {};
    function handleResize() {
      setTableBodySize({
        width: current.offsetWidth,
        height: current.offsetHeight,
      });
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  React.useEffect(() => {
    if (paginationNumberOfItemsToPage) {
      tableStoreSetSection({
        paginationCurrentPage: 1,
      });
    }
  }, [tableStoreSetSection, paginationNumberOfItemsToPage]);

  const memoizedTableData = React.useMemo(() => {
    let result = tableData;
    if (!searchServerSide && searchString) {
      result = tableData.filter((v) => Object.keys(v).some((key) => {
        if ((v[key] || v[key] === 0) && tableTemplate.some((w) => w.dataKey === key)) {
          const currentKeyItem = tableTemplate.filter((x) => x.dataKey === key)[0];
          if (currentKeyItem && currentKeyItem.type === 'select') {
            const temp = currentKeyItem.options.filter((z) => z.value === v[key])[0];
            return temp.label.toLowerCase().includes(searchString.toLowerCase());
          }
          if (currentKeyItem && currentKeyItem.type === 'date') {
            return moment(v[key]).format(currentKeyItem.dateFormat || 'DD.MM.YYYY HH:mm').includes(searchString.toLowerCase());
          }
          return v[key].toString().toLowerCase().includes(searchString.toLowerCase());
        }
        return false;
      }));
    }

    if (!sortServerSide) {
      if (sortSortingValue) {
        if (sortSortingValue.sortColumn && sortSortingValue.sortType === 'asc') {
          result = sortBy(result, sortSortingValue.sortColumn);
        }
        if (sortSortingValue.sortColumn && sortSortingValue.sortType === 'desc') {
          result = sortBy(result, sortSortingValue.sortColumn).reverse();
        }
      }
    }
    return result;
  }, [
    tableData,
    tableTemplate,
    searchServerSide,
    searchString,
    sortServerSide,
    sortSortingValue,
  ]);

  const memoizedTableDataToPage = React.useMemo(() => {
    let result = memoizedTableData;

    if (!paginationServerSide) {
      const indexOfLastItem = paginationCurrentPage * paginationNumberOfItemsToPage;
      const indexOfFirstItem = indexOfLastItem - paginationNumberOfItemsToPage;
      result = result.slice(indexOfFirstItem, indexOfLastItem);
    }

    return result;
  }, [
    paginationServerSide,
    paginationNumberOfItemsToPage,
    paginationCurrentPage,
    memoizedTableData,
  ]);

  const handleTableStoreSetSection = React.useCallback((value) => {
    if (tableStoreSetSection) {
      tableStoreSetSection(value);
    }
  }, [tableStoreSetSection]);

  const handleTableStoreSetTemplateSection = React.useCallback((value) => {
    if (tableTemplateSetSection) {
      tableTemplateSetSection(value);
    }
  }, [tableTemplateSetSection]);

  const searchSetString = React.useCallback((editName, editValue) => {
    handleTableStoreSetSection({
      searchString: editValue,
    });
  }, [handleTableStoreSetSection]);

  const paginationSetCurrentPage = React.useCallback((value) => {
    handleTableStoreSetSection({
      paginationCurrentPage: value,
    });
  }, [handleTableStoreSetSection]);

  const paginationSetNumberOfItemsToPage = React.useCallback((value) => {
    handleTableStoreSetSection({
      paginationNumberOfItemsToPage: value,
    });
  }, [handleTableStoreSetSection]);

  const sortSetSortingValue = React.useCallback((value) => {
    handleTableStoreSetSection({
      sortSortingValue: value,
    });
  }, [handleTableStoreSetSection]);

  const handleColumnResize = React.useCallback((columnWidth, dataKey) => {
    handleTableStoreSetTemplateSection({
      dataKey,
      width: columnWidth,
    });
  }, [handleTableStoreSetTemplateSection]);

  return (
    <div className={`ui-rsuite-table${type ? ` ${type}` : ''}`}>
      <div className="ui-rsuite-table__control-block">
        {(pagination || search) && (
          <UIRsuiteTableControlBlock
            pagination={pagination}
            paginationNumberOfItemsToPage={paginationNumberOfItemsToPage}
            paginationSetNumberOfItemsToPage={paginationSetNumberOfItemsToPage}
            paginationTotalItems={paginationServerSide
              ? paginationTotalItems
              : memoizedTableData.length}
            filter={filter}
            filterSelectedItemsCount={filterSelectedItemsCount}
            filterBody={filterBody}
            filterType={filterType}
            filterBodyTitle={filterBodyTitle}
            filterClearCallback={filterClearCallback}
            search={search}
            searchPlaceholder={searchPlaceholder}
            searchString={searchString}
            searchSetString={searchSetString}
            searchCustom={searchCustom}
            refresh={refresh}
            refreshCallback={refreshCallback}
            refreshTitle={refreshTitle}
          />
        )}
      </div>

      <div className="ui-rsuite-table__body" ref={tableBodyRef}>
        <div className="ui-rsuite-table__table">
          <UIRsuiteTableBody
            customId={customId}
            tableData={memoizedTableDataToPage}
            tableTemplate={memoizedTableTemplate}
            tableEmptyMessage={tableEmptyMessage}
            tableLoadingMessage={tableLoadingMessage}
            contextMenu={contextMenu}
            actions={actions}
            readOnly={readOnly}
            sortSortingValue={sortSortingValue}
            sortSetSortingValue={sortSetSortingValue}
            tableLoading={tableLoading}
            tableIsResizable={tableIsResizable}
            tableIsWordWrap={tableIsWordWrap}
            tableOnColumnResizeCallback={handleColumnResize}
            onRowClick={onRowClick}
            onRowDoubleClick={onRowDoubleClick}
            tableHeaderHeight={tableHeaderHeight}
            tableRowHeight={tableRowHeight}
            tableBodyHeight={tableBodySize.height}
            tableVirtualized={tableVirtualized}
            loading={loading}
          />
        </div>
      </div>

      <div className="ui-rsuite-table__pagination">
        {pagination && (
          <UIPagination
            onPageChanged={paginationSetCurrentPage}
            currentPage={paginationCurrentPage}
            totalRecords={paginationServerSide ? paginationTotalItems : memoizedTableData.length}
            pageNeighbours={paginationPageNeighbours}
            pageLimit={paginationNumberOfItemsToPage}
            editable
            type="--transparent"
          />
        )}
      </div>

    </div>
  );
}

export default React.memo(UIRsuiteTable);
