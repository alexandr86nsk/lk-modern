import React from 'react';
import './UIPagination.scss';
import ArrowIcon from './left-gray-arrow.svg';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from, to, step = 1) => {
  let i = from;
  const rangeEl = [];

  while (i <= to) {
    rangeEl.push(i);
    i += step;
  }

  return rangeEl;
};

function UIPagination(props) {
  const {
    onPageChanged,
    currentPage = 1,
    pageNeighbours = 1,
    totalRecords = 0,
    pageLimit = 1,
    editable,
    type,
  } = props || {};

  const inputEl = React.useRef(null);

  // eslint-disable-next-line max-len
  const totalPages = React.useMemo(() => Math.ceil(totalRecords / pageLimit), [pageLimit, totalRecords]);

  const gotoPage = React.useCallback((page) => {
    if (onPageChanged) {
      onPageChanged(page);
    }
  }, [onPageChanged]);

  const handlePageInput = React.useCallback((e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      let pageToGo = parseInt(inputEl.current.value || 1, 10);
      if (pageToGo > totalPages) {
        pageToGo = totalPages;
      }
      if (pageToGo < 1) {
        pageToGo = 1;
      }
      inputEl.current.value = null;
      gotoPage(pageToGo);
    }
  }, [gotoPage, totalPages]);

  const handleClick = React.useCallback((page) => (evt) => {
    evt.preventDefault();
    gotoPage(page);
  }, [gotoPage]);

  const handleMoveLeft = React.useCallback((evt) => {
    evt.preventDefault();
    gotoPage(currentPage - (pageNeighbours * 2) - 1);
  }, [currentPage, gotoPage, pageNeighbours]);

  const handleMoveRight = React.useCallback((evt) => {
    evt.preventDefault();
    gotoPage(currentPage + (pageNeighbours * 2) + 1);
  }, [currentPage, gotoPage, pageNeighbours]);

  const fetchPageNumbers = React.useCallback(() => {
    const totalNumbers = (pageNeighbours * 2) + 3;
    const totalBlocks = totalNumbers + 2;


    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

      let pages = range(startPage, endPage);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = (totalPages - endPage) > 1;
      const spillOffset = totalNumbers - (pages.length + 1);
      let extraPages = [];

      switch (true) {
        case (hasLeftSpill && !hasRightSpill): {
          extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        case (!hasLeftSpill && hasRightSpill): {
          extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        case (hasLeftSpill && hasRightSpill):
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  }, [currentPage, pageNeighbours, totalPages]);

  if (!totalRecords || totalPages === 1) return null;
  const pages = fetchPageNumbers();

  return (
    <nav className={`ui-pagination${editable ? ' editable' : ''}${type ? ` ${type}` : ''}`}>
      <ul className="ui-pagination__body">
        {pages.map((page) => {
          if (page === LEFT_PAGE) {
            return (
              <li key={page}>
                <div
                  role="presentation"
                  className="ui-pagination__button paginate-prev"
                  onClick={handleMoveLeft}
                >
                  <ArrowIcon />
                </div>
              </li>
            );
          }
          if (page === RIGHT_PAGE) {
            return (
              <li key={page}>
                <div
                  role="presentation"
                  className="ui-pagination__button paginate-next"
                  onClick={handleMoveRight}
                >
                  <ArrowIcon />
                </div>
              </li>
            );
          }
          return (
            <li
              role="presentation"
              key={page}
              className={`ui-pagination__button ${currentPage === page ? ' active' : ''}`}
              onClick={handleClick(page)}
            >
              {page}
            </li>
          );
        })}
      </ul>
      {editable && (
        <div className="ui-pagination__go-to">
          <span>Перейти</span>
          <input
            ref={inputEl}
            className="input ellipsis-element"
            type="number"
            onKeyDown={handlePageInput}
          />
        </div>
      )}
    </nav>
  );
}

export default React.memo(UIPagination);
