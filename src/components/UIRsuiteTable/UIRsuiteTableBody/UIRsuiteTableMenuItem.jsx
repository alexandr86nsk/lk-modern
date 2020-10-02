import React from 'react';
import UIRsuiteTableFilePicker from '../common/UIRsuiteTableFilePicker/UIRsuiteTableFilePicker';

const UIRsuiteTableMenuItem = (props) => {
  const {
    item,
    isButton,
    callback,
    uploadCallback,
  } = props || {};
  const {
    id,
    action,
    icon,
    title,
    upload,
    fileTypes,
    hideTitle,
    color,
  } = item || {};

  const handleUploadCallback = React.useCallback((files) => {
    if (uploadCallback && action) {
      uploadCallback(action, files);
    }
  }, [action, uploadCallback]);

  const handleCallback = React.useCallback(() => {
    if (callback && action) {
      callback(action);
    }
  }, [action, callback]);

  if (upload) {
    return (
      <UIRsuiteTableFilePicker
        key={id}
        title={title}
        fileTypes={fileTypes}
        callback={handleUploadCallback}
        hideTitle={hideTitle}
        isButton={isButton}
        icon={icon}
      />
    );
  }
  if (isButton) {
    return (
      <button
        type="button"
        title={title}
        className={`ui circular button${color ? ` ${color}` : ''}${hideTitle ? ' icon' : ''}`}
        onClick={handleCallback}
      >
        {icon && <i aria-hidden="true" className={`icon ${icon}`} />}
        {hideTitle ? '' : title || ''}
      </button>
    );
  }
  return (
    <div
      key={id}
      role="presentation"
      className="context-menu__item"
      onClick={handleCallback}
    >
      {icon && <i className={`icon ${icon}`} aria-hidden />}
      <span className="text" aria-hidden>{title || ''}</span>
    </div>
  );
};

export default React.memo(UIRsuiteTableMenuItem);
