import React from 'react';
import './ReportsGridPage.scss';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { connect } from 'react-redux';
import uuid from 'uuid';
import actions from '../../redux/actions/actions';
import UIBlockTitle from '../../components/UIBlockTitle/UIBlockTitle';
import UIDropdownMenu from '../../components/UIDropdownMenu/UIDropdownMenu';
import menuTemplate from './settings';
import ReportsGridLayout from './ReactGridLayout/ReportsGridLayout';

function ReportsGridPage(props) {
  const {
    reportsGridStoreAddReport,
    reportsGridStoreGetBriefcases,
    reportsGridStoreGetBriefcasesCancel,
  } = props || {};

  const contentRef = React.useRef(null);

  const handleAddReport = React.useCallback((value) => {
    reportsGridStoreAddReport({
      id: uuid.v4(),
      type: value,
    });
  }, [reportsGridStoreAddReport]);

  const handleGetToolbox = React.useCallback((value) => {
    console.log('Toolbox', value);
  }, []);

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
        <div className="reports-grid-page__report-list">
          <UIDropdownMenu
            title="Добавить отчет"
            callback={handleAddReport}
            items={menuTemplate}
          />
        </div>
        <div className="reports-grid-page__toolbox">
          <UIDropdownMenu
            menuDirection="left"
            title="Сохраненные панели"
            callback={handleGetToolbox}
            items={menuTemplate}
          />
        </div>
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
