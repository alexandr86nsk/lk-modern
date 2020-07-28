import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './UIStepInput.scss';
import InputMask from 'react-input-mask';


function UIStepInput(props) {
  const {
    title = '',
    units = '',
    maxValue = '50',
    minValue = '0',
    mask = '',
    marks = {
      0: '',
      100: '',
    },
    callback,
    data = 0,
  } = props;

  const { Handle } = Slider;

  const handle = React.useCallback(
    (prop) => {
      const { value, ...restProps } = prop;
      return (
        <Handle value={value} {...restProps}>
          <div className="rc-slider-handle__tooltip-wrapper">
            <div className="rc-tooltip">
              <div className="rc-tooltip__body">{value}</div>
              <div className="rc-tooltip__arrow-wrapper">
                <div className="rc-tooltip__arrow" />
              </div>
            </div>
          </div>
        </Handle>
      );
    }, [],
  );

  const handleChange = React.useCallback((e) => {
    if (callback) {
      callback(e.target.value);
    }
  }, [callback]);

  return (
    <div className="ui-step-input">
      <div className="ui-step-input__input-block">
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
      <div className="ui-step-input__slider">
        <Slider
          min={minValue}
          max={maxValue}
          marks={marks}
          step={null}
          onChange={handleChange}
          value={data}
          handle={handle}
        />
        <div className="ui-step-input__range">
          <span>{`${minValue} ${units}`}</span>
          <span>{`${maxValue} ${units}`}</span>
        </div>
      </div>
    </div>
  );
}


export default React.memo(UIStepInput);
