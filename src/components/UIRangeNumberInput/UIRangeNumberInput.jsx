import React from 'react';
import './UIRangeNumberInput.scss';
import NumberFormat from 'react-number-format';


function UIRangeNumberInput(props) {
  const {
    title = '',
    nameFrom = '',
    nameTo = '',
    callback,
    dataFrom = '',
    dataTo = '',
  } = props;

  const handleChangeFrom = React.useCallback((values) => {
    if (callback) {
      const { value } = values;
      callback(nameFrom, value);
    }
  }, [callback, nameFrom]);

  const handleChangeTo = React.useCallback((values) => {
    const { value } = values;
    callback(nameTo, value);
  }, [callback, nameTo]);

  return (
    <div className="ui-range-number-input">
      {title && (
      <div className="ui-range-number-input__title font-type-b-10">
        <span className="ellipsis-element">{title}</span>
      </div>
      )}
      <div className="ui-range-number-input__input-block">
        <div className="ui-range-number-input__input from">
          <NumberFormat
            thousandSeparator
            onValueChange={handleChangeFrom}
            value={dataFrom}
            placeholder="от"
          />
        </div>
        <div className="ui-range-number-input__separator">-</div>
        <div className="ui-range-number-input__input to">
          <NumberFormat
            thousandSeparator
            onValueChange={handleChangeTo}
            value={dataTo}
            placeholder="до"
          />
        </div>
      </div>
    </div>
  );
}

export default React.memo(UIRangeNumberInput);
