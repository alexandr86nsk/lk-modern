import React, { useRef } from 'react';
import './UITable.scss';
import { Table } from 'semantic-ui-react';
import * as moment from 'moment';
import sortBy from 'lodash/sortBy';
import UITableCell from './UITableCell';
import UIPagination from '../UIPagination/UIPagination';
import UISelect from '../UISelect/UISelect';
import UISearch from '../UISearch/UISearch';
import FilterIcon from '../../static/images/filter_list-24px.svg';
import RefreshIcon from '../../static/images/refresh-24px.svg';
import numberOfRecords from './common/numberOfRecords';
import UITableFilter from './UITableFilter';
import UILoader from '../UILoader/UILoader';


function UITable(props) {
  const {
    data = [],
    header = [],
    pagination,
    paginationNumber,
    search,
    searchString,
    searchCallback,
    filter,
    filterSelected,
    filterBody,
    filterClear,
    sortable,
    sortDefault,
    sortList = [],
    customId,
    actions = {},
    empty = 'Пока данных нет',
    loadingData,
    selectable,
    fixed,
    singleLine,
    striped = true,
    refresh,
    refreshCallback,
    tableSize = 'small'
  } = props || {};

  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(paginationNumber || 20);
  const [sorting, setSorting] = React.useState({ column: null, direction: null });

  const filterEl = useRef(null);
  const [showFilter, setShowFilter] = React.useState(false);
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (filterEl.current && !filterEl.current.contains(event.target)) {
        setShowFilter(false);
      }
    }
    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  });

  const handleShowFilter = React.useCallback(() => {
    setShowFilter(!showFilter);
  }, [showFilter]);

  const handleCloseFilter = React.useCallback(() => {
    setShowFilter(false);
  }, []);

  React.useEffect(
    () => setCurrentPage(1), [itemsPerPage, searchString, filterSelected],
  );

  const handleRefresh = React.useCallback(() => {
    refreshCallback();
  }, [refreshCallback]);

  const handleSearch = React.useCallback((value) => {
    searchCallback(value);
  }, [searchCallback]);

  const handleSetNumber = React.useCallback(
    (value) => setItemsPerPage(value), [setItemsPerPage],
  );

  const dataToPage = React.useMemo(() => {
    let result = [];
    if (searchString) {
      result = data.filter((v) => Object.keys(v).filter((key) => {
        if (v[key] && header.filter((w) => w.value === key).length) {
          if (header.filter((x) => x.value === key)[0].type === 'options-select') {
            if (header.filter((y) => y.value === key)[0].options
              .filter((z) => z.value === v[key])[0]) {
              return header.filter((y) => y.value === key)[0].options
                .filter((z) => z.value === v[key])[0].label
                .toString().toLowerCase().includes(searchString.toLowerCase());
            }
            return false;
          }
          if (header.filter((x) => x.value === key)[0].type === 'date') {
            return moment(v[key]).format(v.dateFormat || 'L').includes(searchString.toLowerCase());
          }
          if (Array.isArray(v[key])) {
            return v[key].filter((b) => b[header.filter((x) => x.value === key)[0]
              .searchValue].toString().toLowerCase().includes(searchString.toLowerCase())).length;
          }
          return v[key].toString().toLowerCase().includes(searchString.toLowerCase());
        }
        if (v[key] && header.filter((w) => w.type === 'inline')) {
          return header.filter((w) => {
            if (w.type === 'inline') {
              let string = '';
              w.value.forEach((z) => {
                string = `${string} ${v[z]}`;
              });
              return string.toLowerCase().includes(searchString.toLowerCase());
            }
            return false;
          }).length;
        }
        return false;
      }).length);
    } else {
      result = data;
    }

    if (sortDefault && sortDefault.length) {
      result = sortBy(result, sortDefault);
    }

    if (sorting.column && sorting.direction === 'ascending') {
      result = sortBy(result, sorting.column);
    }

    if (sorting.column && sorting.direction === 'descending') {
      result = sortBy(result, sorting.column).reverse();
    }

    return result;
  }, [data, header, searchString, sortDefault, sorting.column, sorting.direction]);

  const indexOfLastItem = React.useMemo(
    () => currentPage * itemsPerPage,
    [currentPage, itemsPerPage],
  );
  const indexOfFirstItem = React.useMemo(
    () => indexOfLastItem - itemsPerPage,
    [indexOfLastItem, itemsPerPage],
  );
  const itemsToPage = React.useMemo(
    () => dataToPage.slice(indexOfFirstItem, indexOfLastItem),
    [dataToPage, indexOfFirstItem, indexOfLastItem],
  );

  const handleSort = React.useCallback((value) => () => {
    if (sorting.column !== value) {
      setSorting({
        column: value,
        direction: 'ascending',
      });
      return;
    }
    setSorting({
      ...sorting,
      direction: sorting.direction === 'ascending' ? 'descending' : 'ascending',
    });
  }, [sorting]);

  const renderHeader = React.useMemo(
    () => header.map((v) => {
      if (v.colSpan !== 0) {
        if (v.type === 'inline') {
          if (sortable && sortList.includes(v.value[0])) {
            return (
              <Table.HeaderCell
                key={v.id}
                colSpan={v.colSpan}
                sorted={sorting.column === v.value[0] ? sorting.direction : null}
                onClick={handleSort(v.value[0])}
              >
                {v.title}
              </Table.HeaderCell>
            );
          }
        }
        if (sortable && sortList.includes(v.value)) {
          return (
            <Table.HeaderCell
              key={v.id}
              colSpan={v.colSpan}
              sorted={sorting.column === v.value ? sorting.direction : null}
              onClick={handleSort(v.value)}
            >
              {v.title}
            </Table.HeaderCell>
          );
        }
        if (sortable && sortList && Array.isArray(sortList) && sortList.length === 0) {
          return (
            <Table.HeaderCell
              key={v.id}
              colSpan={v.colSpan}
              sorted={sorting.column === v.value ? sorting.direction : null}
              onClick={handleSort(v.value)}
            >
              {v.title}
            </Table.HeaderCell>
          );
        }
        return (
          <Table.HeaderCell
            key={v.id}
            colSpan={v.colSpan}
          >
            {v.title}
          </Table.HeaderCell>
        );
      }
      return null;
    }), [handleSort, header, sortList, sortable, sorting.column, sorting.direction],
  );

  const renderRows = React.useMemo(
    () => {
      let result;
      if (data.length) {
        result = itemsToPage.map((v) => (
          <Table.Row key={v[customId || 'id'] || Math.random()}>
            <UITableCell
              data={v}
              list={itemsToPage}
              keys={header}
              actions={actions}
              selectable={selectable}
            />
          </Table.Row>
        ));
      } else {
        result = (
          <Table.Row>
            <Table.Cell className="ui-table__empty" colSpan={header.length}>{empty}</Table.Cell>
          </Table.Row>
        );
      }

      return result;
    },
    [actions, customId, data.length, empty, header, itemsToPage, selectable],
  );

  return (
    <div className="ui-table">
      {(pagination || search) && (
      <div className="ui-table__controls-block">
        <div className="controls-block__left-block">
          {pagination && (
          <div className="select-wrapper">
            <span>Кол-во:</span>
            <UISelect
              options={numberOfRecords}
              selected={itemsPerPage}
              callback={handleSetNumber}
            />
          </div>
          )}
          {(data && data.length > 0)
          && (
          <div className="total-records">
            {`из ${data.length}`}
          </div>
          )}
        </div>
        <div className="controls-block__right-block">
          {filter && (
            <div className="filter-block" ref={filterEl}>
              <div
                role="presentation"
                className={`filter-block__icon ${showFilter ? 'active' : ''}`}
                onClick={handleShowFilter}
                title="Фильтр"
              >
                <FilterIcon />
                {filterSelected > 0 && (
                  <div className="filter-block__badge">
                    {filterSelected}
                  </div>
                )}
              </div>
              {showFilter && (
                <UITableFilter
                  filterBody={filterBody}
                  filterClear={filterClear}
                  filterClose={handleCloseFilter}
                />
              )}
            </div>
          )}
          {search && (
            <div className="search-wrapper">
              <UISearch hideResults callback={handleSearch} data={searchString} />
            </div>
          )}
          {refresh && (
            <div title="Обновить" role="presentation" className="refresh-wrapper" onClick={handleRefresh}>
              <RefreshIcon />
            </div>
          )}
        </div>
      </div>
      )}
      <div className={`ui-table__body font-type-m-11${loadingData ? ' loading' : ''}`}>
        {loadingData
        && (
          <div className="ui-table__dimmer">
            <div className="ui-table__loader">
              <UILoader size="small" text="Загрузка..." />
            </div>
          </div>
        )}
        <Table
          color="teal"
          singleLine={singleLine}
          striped={striped}
          fixed={fixed}
          selectable={selectable}
          sortable={sortable}
          size={tableSize}
        >
          <Table.Header>
            <Table.Row>
              {renderHeader}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {renderRows}
          </Table.Body>
        </Table>
      </div>
      {pagination && (
        <div className="ui-table__pagination">
          <UIPagination
            onPageChanged={setCurrentPage}
            currentPage={currentPage}
            totalRecords={dataToPage.length}
            pageNeighbours={1}
            pageLimit={itemsPerPage}
            editable
          />
        </div>
      )}
    </div>
  );
}

export default React.memo(UITable);
