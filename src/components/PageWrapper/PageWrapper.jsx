import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import * as actions from '../../redux/actions/actions';
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
    setFixedContent(!fixedContent);
  }, [fixedContent]);

  return (
    <>
      {isAuth
        ? (
          <div className={`content${fixedContent ? ' fixed' : ''}`}>
            <div className="menu-container">
              <UISideBar />
            </div>
            <div className="page-container">
              <PageHeader />
              <div className="page">
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
                <PagePopUp />
              </div>
              <PageFooter />
              <PageModal />
              <UIToasts />
              <UIScrollToTop isVisible={scroll} refEl={pageEl.current} />
            </div>
          </div>
        )
        : (
          <>
            {children}
          </>
        )}
    </>
  );
}

const mapDispatchToProps = { ...actions };

export default connect(null, mapDispatchToProps)(PageWrapper);
