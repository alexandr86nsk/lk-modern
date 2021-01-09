import cn from 'classnames';
import React, { memo } from 'react';

import './style.scss';

type InputPropsType = {
  theme?: 'magenta';
  hasCorners?: boolean;
};

function InputComponent({ theme, hasCorners }: InputPropsType) {
  return (
    <div
      className={cn('input', {
        [`input_theme_${theme}`]: theme,
        input_type_corners: hasCorners,
      })}
    >
      <div className="input__inner">
        <input />
      </div>
    </div>
  );
}

export const Input = memo(InputComponent);
