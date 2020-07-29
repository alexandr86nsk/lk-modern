import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/actions';
import UIToasts from '../UIToasts/UIToasts';
import UISideBar from '../UISidebar/UISidebar';
import PageHeader from '../../containers/PageHeader/PageHeader';
import PageFooter from '../../containers/PageFooter/PageFooter';
import PageModal from './PageModal';
import PageControl from './PageControl';
import PagePopUp from './PagePopUp';
import useScrollPage from '../UICustomHooks/useScrollPage/useScrollPage';
import UIScrollToTop from '../UIScrollToTop/UIScrollToTop';
import PageContextMenu from './PageContextMenu';


function PageWrapper(props) {
  const {
    children,
    isAuth,
  } = props;

  const pageEl = React.useRef(null);
  const [scroll, setScroll] = React.useState(false);
  useScrollPage(setScroll, pageEl);

  return (
    <>
      {isAuth
        ? (
          <>
            <div className="menu-container">
              <UISideBar />
            </div>
            <div className="page-container">
              <PageHeader />
              <div className="page">
                {children}
                <PagePopUp />
              </div>
              <PageFooter />
              <PageModal />
              <PageContextMenu />
              <PageControl />
              <UIToasts />
              <UIScrollToTop isVisible={scroll} refEl={pageEl.current} />
            </div>
          </>
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

export default connect(null, mapDispatchToProps)(React.memo(PageWrapper));
