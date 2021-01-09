import cn from 'classnames';
import React, { memo, ReactElement } from "react";

import RequiredIcon from '../../icons/required-icon.svg';
import HintIcon from '../../icons/hint-icon.svg';

import './style.scss';

export type LabelProps = {
  /**
   * Текст заголовка для поля
   */
  title?: string;
  /**
   * Флаг обязательности заполнения поля
   */
  required?: boolean;
  /**
   * Флаг признака только для чтения у поля
   */
  readonly?: boolean;
  /**
   * Текст подсказки для поля
   */
  hintText?: string;
  /**
   * Иконка подсказки для поля
   */
  hintIcon?: ReactElement;
  /**
   * Индивидуальный компонент подсказки для поля
   */
  customHint?: ReactElement;
};

function LabelComponent({ title, required, readonly, hintText, hintIcon, customHint }: LabelProps) {
  const titleRef = React.useRef<HTMLDivElement | null>(null);
  return (
  <div className="ui-form-element__title">
    <div className="ui-form-element__inner-wrapper" ref={titleRef}>
      <div className="ui-form-element__text" title={title}>
        <span>{title}</span>
      </div>
      {!readonly && required && (
        <div className="ui-form-element__icon-wrapper">
          <div
            className="ui-form-element__icon ui-form-element__icon--required"
            title="Обязательное поле"
          >
            <RequiredIcon />
          </div>
        </div>
      )}
      {!readonly && !customHint && (
        <div className="ui-form-element__icon-wrapper">
          <div
            role="presentation"
            className="ui-form-element__icon ui-form-element__icon--hint"
            ref={hintIconRef}
            onMouseEnter={getHintCoords}
            onMouseLeave={clearHintCoords}
          >
            {hintIcon || <HintIcon />}
            <div
              className="ui-form-element__hint"
              ref={hintMessageRef}
              style={hintStyle}
            >
              {hintText}
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
  );
}

export const Label = memo(LabelComponent);