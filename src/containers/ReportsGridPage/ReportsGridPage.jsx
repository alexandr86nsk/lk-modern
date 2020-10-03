import React from 'react';
import './ReportsGridPage.scss';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { connect } from 'react-redux';
import actions from '../../redux/actions/actions';
import UIBlockTitle from '../../components/UIBlockTitle/UIBlockTitle';
import UIDropdownMenu from '../../components/UIDropdownMenu/UIDropdownMenu';
import menuTemplate from './settings';
import ReportsGridLayout from './ReactGridLayout/ReportsGridLayout';
import ReactGridToolbox from './ReactGridToolbox/ReactGridToolbox';

function ReportsGridPage(props) {
  const {
    reportsGridStoreAddReport,
    reportsGridStoreGetBriefcases,
    reportsGridStoreGetBriefcasesCancel,
  } = props || {};

  const contentRef = React.useRef(null);

  React.useEffect(() => {
    reportsGridStoreGetBriefcases();
  }, [reportsGridStoreGetBriefcases]);

  React.useEffect(() => () => {
    reportsGridStoreGetBriefcasesCancel();
  }, [
    reportsGridStoreGetBriefcasesCancel,
  ]);

  return (
    <div className="reports-grid-page page__content">
      <UIBlockTitle title="Отчеты" />
      <div className="reports-grid-page__top-menu">
        <UIDropdownMenu
          title="Добавить отчет"
          callback={() => reportsGridStoreAddReport({
            id: Math.random(),
          })}
          items={menuTemplate}
        />
      </div>
      <div className="reports-grid-page__toolbox">
        <ReactGridToolbox />
      </div>
      <div className="reports-grid-page__body">
        <div className="reports-grid-page__scroll-content" ref={contentRef}>
          <ReportsGridLayout parent={contentRef} />
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = { ...actions };

export default connect(null, mapDispatchToProps)(ReportsGridPage);
