import React from 'react';
import './UISelect.scss';
import useOutsideClick from '../UICustomHooks/useOutsideClick/useOutsideClick';
import UISelectOption from './UISelectOption';
import ArrowIcon from './arrow-icon.svg';

function UISelect(props) {
  const {
    options,
    selected,
    callback,
    type,
  } = props || {};

  const selectEl = React.useRef(null);
  const [showOptions, setShowOptions] = React.useState(false);

  const handleHide = React.useCallback(() => {
    setShowOptions(false);
  }, []);

  useOutsideClick(selectEl, handleHide);

  React.useEffect(() => {
    if (showOptions) {
      document.body.classList.add('select');
    } else {
      document.body.classList.remove('select');
    }
  }, [showOptions]);

  const selectOption = React.useCallback(
    (item) => {
      setShowOptions(false);
      callback(item);
    }, [callback],
  );

  const handleChangeOptionsView = React.useCallback(() => {
    setShowOptions((prev) => !prev);
  }, []);

  const memoizedOptions = React.useMemo(() => {
    if (options && Array.isArray(options)) {
      return options.map((v) => {
        if (v !== selected) {
          return <UISelectOption key={v} option={v} callback={selectOption} />;
        }
        return null;
      });
    }
    return null;
  }, [options, selected, selectOption]);

  return (
    <div
      className={`ui-select${showOptions ? ' active' : ''}${type ? ` ${type}` : ''}`}
      ref={selectEl}
    >
      <input
        className="ui-select__input"
        placeholder={selected}
        onClick={handleChangeOptionsView}
        readOnly
      />
      <div
        role="presentation"
        aria-label="show-options"
        className="ui-select__button"
        onClick={handleChangeOptionsView}
      >
        <ArrowIcon />
      </div>
      <div className="ui-select__options-wrapper">
        <div
          role="presentation"
          className="ui-select__options-background"
          onClick={handleChangeOptionsView}
        />
        <div className="ui-select__options">
          <ul>
            {memoizedOptions}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default React.memo(UISelect);
