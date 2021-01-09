import React, { memo } from 'react';

import './style.scss';

const BARS = ['bar_01', 'bar_02', 'bar_03', 'bar_04'];

function WaveSpinnerComponent() {
  return (
    <div className="rl-spinner rl-spinner_type_wave">
      {BARS.map((bar) => (
        <div key={bar} className="rl-spinner__bar" />
      ))}
    </div>
  );
}

export const WaveSpinner = memo(WaveSpinnerComponent);
