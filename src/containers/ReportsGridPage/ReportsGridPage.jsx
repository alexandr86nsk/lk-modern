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

function ReportsGridPage(props) {
  const {
    popUpStoreClear,
  } = props || {};

  const contentRef = React.useRef(null);

  React.useEffect(() => {
  }, []);

  React.useEffect(() => () => {
    popUpStoreClear();
  }, [
    popUpStoreClear,
  ]);

  return (
    <div className="reports-grid-page page__content">
      <UIBlockTitle title="Отчеты" />
      <div className="reports-grid-page__top-menu">
        <UIDropdownMenu
          title="Добавить отчет"
          callback={(v) => console.log('selected: ', v)}
          items={menuTemplate}
        />
      </div>
      <div className="reports-grid-page__body">
        <div className="reports-grid-page__scroll-content" ref={contentRef}>
          <ReportsGridLayout parent={contentRef} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  tableStore: state.briefcasesStore.tableStore,
  tableTemplate: state.briefcasesStore.tableTemplate,
  briefcases: state.briefcasesStore.briefcases,
  trySaveBriefcase: state.briefcasesStore.trySaveBriefcase,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(ReportsGridPage);
