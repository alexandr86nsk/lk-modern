import React, { memo } from 'react';

import { TitleProps } from '@components/Form/components/Title/types';
import { Icon } from '@components/Icon/Icon';
import { Popup } from '@components/Popup/Popup';

import './styles.scss';

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
          <Icon
            className="rl-title__icon rl-title__icon_type_required"
            name="required"
            title="Обязательное поле"
          />
        )}
        {!isReadOnly && hintText && (
          <Popup
            className="rl-title__popup"
            icon={hintIcon}
            notice={hintText}
            isCloseable={hintIsCloseable}
          >
            {hintContainer}
          </Popup>
        )}
      </div>
    </div>
  );
}

export const Title = memo(TitleComponent);
