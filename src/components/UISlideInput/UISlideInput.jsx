import React from 'react';
import './UISlideInput.scss';
import InputRange from 'react-input-range';
import InputMask from 'react-input-mask';


function UISlideInput(props) {
  const {
    title = '',
    units = '',
    maxValue = 50,
    minValue = 0,
    mask = '',
    data = 0,
    callback,
  } = props;

  const handleChange = React.useCallback((e) => {
    if (callback) {
      callback(e.target.value);
    }
  }, [callback]);

  return (
    <div
      className="ui-slide-input"
    >
      <div className="ui-slide-input__input-block">
        <span>{title}</span>
        <InputMask
          onChange={handleChange}
          value={data}
          disabled
          alwaysShowMask
          mask={mask}
          maskChar={null}
          formatChars={{
            0: '[0-9]',
            a: '[A-Za-z]',
            '*': '[A-Za-z0-9]',
          }}
        />
        <span>{units}</span>
      </div>
      <div className="ui-slide-input__slider">
        <InputRange
          maxValue={maxValue}
          minValue={minValue}
          value={data}
          onChange={handleChange}
        />
        <div className="ui-slide-input__range">
          <span>{`${minValue} ${units}`}</span>
          <span>{`${maxValue} ${units}`}</span>
        </div>
      </div>
    </div>
  );
}


export default React.memo(UISlideInput);
