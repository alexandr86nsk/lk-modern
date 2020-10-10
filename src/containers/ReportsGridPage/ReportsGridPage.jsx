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

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem('reportsGridToolbox')) || {};
    } catch (e) {
      /* Ignore */
    }
  }
  return ls[key];
}

function saveToLS(value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      'reportsGridToolbox',
      JSON.stringify(value),
    );
  }
}

const originalLayouts = JSON.parse(JSON.stringify(getFromLS('layouts') || {}));

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

  const handleGetToolbox = React.useCallback((value) => {
    console.log('Toolbox', value);
  }, []);

  const handleSaveToolbox = React.useCallback(() => {
    saveToLS({

    });
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
          <div className="reports-grid-page__save-btn">
            <Button
              circular
              primary
              size="tiny"
              loading={false}
              onClick={handleSaveToolbox}
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

const mapDispatchToProps = { ...actions };

export default connect(null, mapDispatchToProps)(ReportsGridPage);
