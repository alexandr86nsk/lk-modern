import React from 'react';
import './UIPageControl.scss';
import UILoader from '../Loader';
import UITransition from '../UITransition/UITransition';
import controlButtons from './settings';

function UIPageControl(props) {
  const {
    actions,
    loading,
  } = props;

  /*  const memoizedButtons = React.useMemo(() => {
    let counter = 0;
    return controlButtons.map((v) => {
      if (actions[v.type]) {
        counter += 1;
        return (
          <UITransition key={v.id} delay={counter * 300}>
            <div
              role="presentation"
              className={`ui-page-control__button ${v.type}`}
              title={v.title}
              onClick={actions[v.type]}
            >
              {v.type !== 'back' && loading[v.type] ? <Loader size="small" /> : v.icon}
            </div>
          </UITransition>
        );
      }
      return null;
    });
  }, [actions, loading]); */

  const memoizedButtons = React.useMemo(() => controlButtons.map((v) => {
    if (actions[v.type]) {
      return (
        <div
          key={v.id}
          role="presentation"
          className={`ui-page-control__button ${v.type} active`}
          title={v.title}
          onClick={actions[v.type]}
        >
          {v.type !== 'back' && loading[v.type] ? <UILoader size="small" /> : v.icon}
        </div>
      );
    }
    return null;
  }), [actions, loading]);

  return (
    <div className="ui-page-control">
      {memoizedButtons}
      {/* <UITransition>
        <div className="test ui-page-control__button add">Тест</div>
      </UITransition>
      {actions.back && !hide.back && (
        <div role="presentation" className="ui-page-control__button back" title="Назад" onClick={actions.back}>
          <BackIcon />
        </div>
      )}
      {actions.add && !hide.add && (
        <div role="presentation" className="ui-page-control__button add" title="Создать" onClick={actions.add}>
          {loading.add ? <Loader size="small" /> : <AddIcon />}
        </div>
      )}
      {actions.delete && !hide.delete && (
      <div
        role="presentation"
        className="ui-page-control__button delete"
        title="Удалить"
        onClick={actions.delete}
      >
        {loading.delete ? <Loader size="small" /> : <DeleteIcon />}
      </div>
      )}
      {actions.save && !hide.save && (
      <div role="presentation" className="ui-page-control__button save" title="Сохранить" onClick={actions.save}>
        {loading.save ? <Loader size="small" /> : <SaveIcon />}
      </div>
      )}
      {actions.complete && !hide.complete && (
        <div role="presentation" className="ui-page-control__button save" title="Выполнить" onClick={actions.complete}>
          {loading.complete ? <Loader size="small" /> : <SaveIcon />}
        </div>
      )} */}
    </div>
  );
}

export default React.memo(UIPageControl);
