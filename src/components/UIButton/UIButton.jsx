import React from 'react';
import './UIButton.scss';
import UILoader from '../Loader';


function UIButton(props) {
  const {
    title = '',
    leftIcon,
    rightIcon,
    callback,
    type = '',
    disabled,
    loading,
    loaderSize = 'small',
    maxContent,
    hint,
  } = props;

  const handleClick = React.useCallback(() => {
    if (!disabled && !loading && callback) {
      callback();
    }
  }, [callback, disabled, loading]);

  return (
    <button
      type="button"
      className={`ui-button ${type} ${disabled ? 'disabled' : ''} ${maxContent ? 'max-content' : ''}`}
      onClick={handleClick}
      title={hint}
    >
      {leftIcon
      && (
      <div className="ui-button__left-icon">
        {leftIcon}
      </div>
      )}
      <div className="ui-button__title">
        {title}
      </div>
      {loading && (
      <div className="ui-button__loader">
        <UILoader size={loaderSize} />
      </div>
      )}
      {rightIcon
      && (
      <div className="ui-button__right-icon">
        {rightIcon}
      </div>
      )}
    </button>
  );
}

export default React.memo(UIButton);
