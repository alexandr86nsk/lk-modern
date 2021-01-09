import React from 'react';
import './UIRsuiteTableFilter.scss';
import { Button, Icon } from 'semantic-ui-react';
import FilterIcon from '../../../assetssadads/icons/filter_list-24px.svg';

function UIRsuiteTableFilter(props) {
  const {
    filterBody,
    filterIcon,
    filterClearCallback,
    filterType = 'absolute',
    filterBodyTitle = 'Фильтр',
    filterHideControl,
    filterSelectedItemsCount,
  } = props || {};

  const filterEl = React.useRef(null);
  const [showFilter, setShowFilter] = React.useState(false);

  React.useEffect(() => {
    function handleClickOutside(event) {
      const { current } = filterEl || {};
      if (current && !current.contains(event.target)) {
        setShowFilter(false);
      }
    }
    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  });

  const handleShowFilterClick = React.useCallback(() => {
    setShowFilter(!showFilter);
  }, [showFilter]);

  const handleClearClick = React.useCallback(() => {
    if (filterClearCallback) {
      filterClearCallback();
    }
  }, [filterClearCallback]);

  const handleCloseClick = React.useCallback(() => {
    setShowFilter(false);
  }, []);

  return (
    <div className={`ui-filter ${filterType}`} ref={filterEl}>
      <div
        role="presentation"
        className={`ui-filter__icon${showFilter ? ' active' : ''}`}
        onClick={handleShowFilterClick}
        title="Фильтр"
      >
        {filterIcon || <FilterIcon />}
        {filterSelectedItemsCount > 0 && (
          <div className="ui-filter__badge">
            {filterSelectedItemsCount}
          </div>
        )}
      </div>
      {showFilter
      && (
        <div className="ui-filter__body-wrapper">
          <div className="ui-filter__body">
            <div className="ui-filter__body-title">{filterBodyTitle}</div>
            <div className="ui-filter__body-content">
              {filterBody}
            </div>
            {!filterHideControl && (
            <div className="ui-filter__body-control">
              <Button size="tiny" negative title="Очистить" onClick={handleClearClick}>
                <Icon name="close" />
                Очистить
              </Button>
              <Button animated="fade" size="tiny" positive title="Применить и закрыть" onClick={handleCloseClick}>
                <Button.Content visible>
                  <Icon name="check" />
                  Применить
                </Button.Content>
                <Button.Content hidden>Закрыть</Button.Content>
              </Button>
            </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default React.memo(UIRsuiteTableFilter);
