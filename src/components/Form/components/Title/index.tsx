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
  isRequired?: boolean;
  /**
   * Флаг признака только для чтения у поля
   */
  isReadOnly?: boolean;
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
  hintIsCloseable?: boolean;
  /**
   * Индивидуальный компонент подсказки для поля
   */
  hintContainer?: string | ReactElement;
};

function TitleComponent({
  text,
  isRequired,
  isReadOnly,
  hintText,
  hintIcon,
  hintIsCloseable,
  hintContainer,
}: TitleProps) {
  const titleRef = React.useRef<HTMLDivElement | null>(null);
  return (
    <div className="rl-title">
      <div className="rl-title__inner" ref={titleRef}>
        <div className="rl-title__text" title={text}>
          <span>{text}</span>
        </div>
        {!isReadOnly && isRequired && (
          <div className="rl-title__icon" title="Обязательное поле">
            <RequiredIcon />
          </div>
        )}
        {!isReadOnly && hintText && (
          <Popup icon={hintIcon} notice={hintText} isCloseable={hintIsCloseable}>
            {hintContainer}
          </Popup>
        )}
      </div>
    </div>
  );
}

export const Title = memo(TitleComponent);
