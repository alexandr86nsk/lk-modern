import React from 'react';
import './ReportsGridPage.scss';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { Button } from 'semantic-ui-react';
import actions from '../../redux/actions/actions';
import UIBlockTitle from '../../components/UIBlockTitle/UIBlockTitle';
import UIDropdownMenu from '../../components/UIDropdownMenu/UIDropdownMenu';
import menuTemplate from './settings';
import ReportsGridLayout from './ReactGridLayout/ReportsGridLayout';
import useKeyboardObserver from '../../components/UICustomHooks/useKeyboardObserver/useKeyboardObserver';
import UIReactSelect from '../../components/UIReactSelect/UIReactSelect';
import BriefcaseEditor from '../BriefcasesPage/common/BriefcaseEditor';
import ToolboxEditor from './ReactGridToolbox/ToolboxEditor';

function getFromLS() {
  let ls = [];
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem('reportsGridToolbox')) || [];
    } catch (e) {
      /* Ignore */
    }
  }
  return ls;
}

function saveToLS(value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      'reportsGridToolbox',
      JSON.stringify(value),
    );
  }
}

function ReportsGridPage(props) {
  const {
    reports,
    gridLayouts,
    selectedToolbox,
    reportsGridStoreAddReport,
    reportsGridStoreGetBriefcases,
    reportsGridStoreGetBriefcasesCancel,
    reportsGridStoreSetSection,
    popUpStoreSetSection,
  } = props || {};

  const contentRef = React.useRef(null);

  const [toolboxList, setToolboxList] = React.useState(getFromLS());

  const handleAddReport = React.useCallback((value) => {
    reportsGridStoreAddReport({
      id: uuid.v4(),
      type: value,
    });
  }, [reportsGridStoreAddReport]);

  const handlePressKey = React.useCallback((e) => {
    // SHIFT + something
    if (e.shiftKey) {
      switch (e.code) {
        case 'KeyQ':
          handleAddReport('jobDetailReport');
          break;
        case 'KeyW':
          handleAddReport('jobStatusReport');
          break;
        case 'KeyE':
          handleAddReport('jobHistoryReport');
          break;
        case 'KeyR':
          handleAddReport('jobCallHandlingReport');
          break;
        default:
          break;
      }
    }

    // CTRL + SHIFT + something
    /*    if (e.ctrlKey && e.shiftKey) {
      switch (e.code) {
        case 'KeyS':
          console.log('CTRL + Shift + S');
          break;
      }
    } */
  }, [handleAddReport]);

  useKeyboardObserver(handlePressKey);

  const handleSelectToolbox = React.useCallback((_, editValue) => {
    const { reports: thisReports, gridLayouts: thisGridLayouts } = editValue || {};
    reportsGridStoreSetSection({
      reports: thisReports,
      gridLayouts: thisGridLayouts,
    });
  }, [reportsGridStoreSetSection]);

  const handleSaveToolbox = React.useCallback((title) => {
    const list = [...toolboxList, {
      id: uuid.v4(),
      title,
      value: {
        reports,
        gridLayouts,
      },
    }];
    saveToLS(list);
    setToolboxList(list);
  }, [
    toolboxList,
    reports,
    gridLayouts,
  ]);

  const handleSaveToolboxClick = React.useCallback(() => {
    popUpStoreSetSection({
      show: true,
      component: (
        <ToolboxEditor
          callback={handleSaveToolbox}
          list={toolboxList}
          title="Сохранение панели"
        />
      ),
      type: '--right --25 --rounded --styled --compact',
      title: 'Отчеты',
    });
  }, [toolboxList, popUpStoreSetSection, handleSaveToolbox]);

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
            title="Сохраненные панели"
            callback={handleAddReport}
            items={toolboxList}
          />
          <div className="reports-grid-page__save-btn">
            <Button
              circular
              primary
              size="tiny"
              loading={false}
              onClick={handleSaveToolboxClick}
              icon="save"
              title="Сохранить панель"
            />
          </div>
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

const mapStateToProps = (state) => ({
  reports: state.reportsGridStore.reports,
  gridLayouts: state.reportsGridStore.gridLayouts,
  selectedToolbox: state.reportsGridStore.selectedToolbox,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(ReportsGridPage);
