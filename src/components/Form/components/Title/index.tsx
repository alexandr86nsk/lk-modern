// import cn from 'classnames';
import React, { memo, ReactElement } from 'react';

import { Popup } from '@components/Popup';

import RequiredIcon from './icons/required-icon.svg';
import './styles.scss';

export type TitleProps = {
  /**
   * Текст заголовка для поля
   */
  text?: string;
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
  hintText?: string | ReactElement;
  /**
   * Иконка подсказки для поля
   */
  hintIcon?: ReactElement;
  /**
   * Флаг для установки возможности открыть закрыть подсказку по клику
   */
  hintCloseable?: boolean;
  /**
   * Индивидуальный компонент подсказки для поля
   */
  customHint?: string | ReactElement;
};

function TitleComponent({
  text,
  required,
  readonly,
  hintText,
  hintIcon,
  hintCloseable,
  customHint,
}: TitleProps) {
  const titleRef = React.useRef<HTMLDivElement | null>(null);
  return (
    <div className="rl-title">
      <div className="rl-title__inner" ref={titleRef}>
        <div className="rl-title__text" title={text}>
          <span>{text}</span>
        </div>
        {!readonly && required && (
          <div className="rl-title__icon" title="Обязательное поле">
            <RequiredIcon />
          </div>
        )}
        {!readonly && hintText && (
          <Popup icon={hintIcon} notice={hintText} closeable={hintCloseable}>
            {customHint}
          </Popup>
        )}
      </div>
    </div>
  );
}

export const Title = memo(TitleComponent);
