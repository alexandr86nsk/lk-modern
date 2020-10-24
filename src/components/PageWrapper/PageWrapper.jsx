import React from 'react';
import { Button } from 'semantic-ui-react';
import UIToasts from '../UIToasts/UIToasts';
import UISideBar from '../UISidebar/UISidebar';
import PageHeader from '../../containers/PageHeader/PageHeader';
import PageFooter from '../../containers/PageFooter/PageFooter';
import PageModal from './PageModal';
import PagePopUp from './PagePopUp';
import useScrollPage from '../UICustomHooks/useScrollPage/useScrollPage';
import UIScrollToTop from '../UIScrollToTop/UIScrollToTop';
import ErrorBoundary from '../UIErrorBoundary/UIErrorBoundary';

function PageWrapper(props) {
  const {
    children,
    isAuth,
  } = props || {};

  const pageEl = React.useRef(null);
  const [scroll, setScroll] = React.useState(false);
  const [fixedContent, setFixedContent] = React.useState(false);
  useScrollPage(setScroll, pageEl);

  const handleSetFixedContent = React.useCallback(() => {
    setFixedContent((prev) => !prev);
  }, []);

  return (
    <>
      {isAuth
        ? (
          <div className={`content${fixedContent ? ' fixed' : ''}`}>
            <div className="menu-container">
              <ErrorBoundary>
                <UISideBar />
              </ErrorBoundary>
            </div>
            <div className="page-container">
              <ErrorBoundary>
                <PageHeader />
              </ErrorBoundary>
              <div className="page" ref={pageEl}>
                <div className="page__fixed-btn">
                  <Button
                    title={fixedContent ? 'Свернуть' : 'Развернуть на весь экран'}
                    onClick={handleSetFixedContent}
                    circular
                    icon={fixedContent ? 'compress' : 'expand'}
                  />
                </div>
                <ErrorBoundary>
                  {children}
                </ErrorBoundary>
                <ErrorBoundary>
                  <PagePopUp />
                </ErrorBoundary>
              </div>
              <ErrorBoundary>
                <PageFooter />
              </ErrorBoundary>
              <ErrorBoundary>
                <PageModal />
              </ErrorBoundary>
              <ErrorBoundary>
                <UIToasts />
              </ErrorBoundary>
              <UIScrollToTop isVisible={scroll} refEl={pageEl.current} />
            </div>
          </div>
        ) : children}
    </>
  );
}

export default React.memo(PageWrapper);
