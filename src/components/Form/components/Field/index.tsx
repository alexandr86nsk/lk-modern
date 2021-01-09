import cn from 'classnames';
import React, { memo } from 'react';

import './style.scss';

type TitlePropsType = {
  theme?: 'magenta';
  hasCorners?: boolean;
};

function FieldComponent({ theme, hasCorners }: TitlePropsType) {
  return (
    <div className="rl-field">
    <fieldset className="ui-form-element__fieldset">
      <legend className="ui-form-element__legend" style={{ width: titleWidth }} />
    </fieldset>
  <div className="ui-form-element__title">
    <div className="ui-form-element__inner-wrapper" ref={titleRef}>
      <div className="ui-form-element__text" title={title}>
        <span>{title}</span>
      </div>
      {required && !isReadOnly && (
        <div className="ui-form-element__icon-wrapper">
          <div
            className="ui-form-element__icon ui-form-element__icon--required"
            title="Обязательное поле"
          >
            <RequiredIcon />
          </div>
        </div>
      )}
      {hint && !isReadOnly && (
        <div className="ui-form-element__icon-wrapper">
          <div
            role="presentation"
            className="ui-form-element__icon ui-form-element__icon--hint"
            ref={hintIconRef}
            onMouseEnter={getHintCoords}
            onMouseLeave={clearHintCoords}
          >
            <HintIcon />
            <div
              className="ui-form-element__hint"
              ref={hintMessageRef}
              style={hintStyle || undefined}
            >
              {hintMessage}
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
      </div>
  );
}

export const Field = memo(FieldComponent);