import React, { memo, ReactElement } from 'react';

/*import useScrollPage from '@spinners/UICustomHooks/useScrollPage/useScrollPage';*/

/*import UIScrollToTop from '@spinners/UIScrollToTop/UIScrollToTop';
import UISidebar from '@spinners/UISidebar/UISidebar';*/
// import UIToasts from '@spinners/UIToasts/UIToasts';

import { Footer } from './components/Footer';
import { Header } from './components/Header';

/*import PageModal from './PageModal';
import PagePopUp from './PagePopUp';*/

type PageWrapperPropsType = {
  children: ReactElement | ReactElement[];
};

function PageWrapperComponent({ children }: PageWrapperPropsType) {
  const pageEl = React.useRef(null);
  /*const [scroll, setScroll] = React.useState(false);*/
  const [fixedContent, setFixedContent] = React.useState(false);
  // useScrollPage(setScroll, pageEl);

  const handleSetFixedContent = React.useCallback(() => {
    setFixedContent((prev) => !prev);
  }, []);

  return (
    <div className={`content${fixedContent ? ' fixed' : ''}`}>
      <div className="menu-container">{/*<UISidebar />*/}</div>
      <div className="page-container">
        <Header />
        <div className="page" ref={pageEl}>
          <div className="page__fixed-btn">
            <button
              title={fixedContent ? 'Свернуть' : 'Развернуть на весь экран'}
              onClick={handleSetFixedContent}
              // icon={fixedContent ? 'compress' : 'expand'}
            />
          </div>
          {children}
          {/*<PagePopUp />*/}
        </div>
        <Footer />
        {/*
              <PageModal />
            */}
        {/*
              <UIToasts />
            */}
        {/*<UIScrollToTop isVisible={scroll} refEl={pageEl.current} />*/}
      </div>
    </div>
  );
}

export const PageWrapper = memo(PageWrapperComponent);
