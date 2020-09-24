import React from 'react';
import UIRsuiteTableFilePicker from '../common/UIRsuiteTableFilePicker/UIRsuiteTableFilePicker';

const UIRsuiteTableMenuItem = (props) => {
  const {
    item,
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
  } = item || {};

  const handleUploadCallback = React.useCallback((files) => {
    if (uploadCallback && action) {
      uploadCallback(action, files);
    }
  }, [action, uploadCallback]);

  const handleCallback = React.useCallback((e) => {
    e.stopPropagation();
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
      />
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

export default UIRsuiteTableMenuItem;
