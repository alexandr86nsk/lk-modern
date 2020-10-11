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
import ToolboxEditor from './ReactGridToolbox/ToolboxEditor';
import WarningIcon from '../../static/images/warning-24px.svg';

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
    toolboxTitle,
    reportsGridStoreAddReport,
    reportsGridStoreGetBriefcases,
    reportsGridStoreGetBriefcasesCancel,
    reportsGridStoreSetSection,
    popUpStoreSetSection,
    popUpStoreClear,
    modalStoreSetSection,
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

  const handleSelectToolbox = React.useCallback((value) => {
    const {
      reports: thisReports,
      gridLayouts: thisGridLayouts,
      toolboxTitle: thisTitle,
    } = value || {};
    reportsGridStoreSetSection({
      reports: thisReports,
      gridLayouts: thisGridLayouts,
      toolboxTitle: thisTitle,
    });
  }, [reportsGridStoreSetSection]);

  const saveToolbox = React.useCallback((value) => {
    const { title, hasDouble } = value || {};
    let list = toolboxList;
    if (hasDouble) {
      list = toolboxList.map((v) => {
        const { title: thisTitle } = v || {};
        if (thisTitle === title) {
          return {
            ...v,
            value: {
              reports,
              gridLayouts,
              toolboxTitle: title,
            },
          };
        }
        return v;
      });
    } else {
      list = [...toolboxList, {
        id: uuid.v4(),
        title,
        value: {
          reports,
          gridLayouts,
          toolboxTitle: title,
        },
      }];
    }
    saveToLS(list);
    setToolboxList(list);
    popUpStoreClear();
  }, [
    toolboxList,
    reports,
    gridLayouts,
    popUpStoreClear,
  ]);

  const handleSaveToolbox = React.useCallback((title) => {
    const hasDouble = toolboxList && Array.isArray(toolboxList)
      ? toolboxList.find((v) => v.title === title)
      : false;
    if (hasDouble) {
      modalStoreSetSection({
        show: true,
        tempData: {
          title,
          hasDouble,
        },
        outputBody: {
          icon: <WarningIcon />,
          title: 'Важно',
          body: <div>Уже есть панель с таким названием. Перезаписать?</div>,
          buttons: {
            positiveTitle: 'Перезаписать',
            negativeTitle: 'Отмена',
          },
        },
        callback: saveToolbox,
      });
    } else {
      saveToolbox({ title });
    }
  }, [
    toolboxList,
    saveToolbox,
    modalStoreSetSection,
  ]);

  const handleSaveToolboxClick = React.useCallback(() => {
    popUpStoreSetSection({
      show: true,
      component: (
        <ToolboxEditor
          saveCallback={handleSaveToolbox}
          cancelCallback={popUpStoreClear}
          title={toolboxTitle}
        />
      ),
      type: '--right --25 --rounded --styled --compact',
      title: 'Отчеты',
    });
  }, [
    toolboxTitle,
    popUpStoreSetSection,
    popUpStoreClear,
    handleSaveToolbox,
  ]);

  React.useEffect(() => {
    reportsGridStoreGetBriefcases();
  }, [reportsGridStoreGetBriefcases]);

  React.useEffect(() => () => {
    reportsGridStoreGetBriefcasesCancel();
    popUpStoreClear();
  }, [
    reportsGridStoreGetBriefcasesCancel,
    popUpStoreClear,
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
        <div className="reports-grid-page__toolbox-title">
          {toolboxTitle}
        </div>
        <div className="reports-grid-page__toolbox-selector">
          <UIDropdownMenu
            title="Сохраненные панели"
            callback={handleSelectToolbox}
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
  toolboxTitle: state.reportsGridStore.toolboxTitle,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(ReportsGridPage);
