import React, { memo } from 'react';

import './styles.scss';

const bars = ['bar_01', 'bar_02', 'bar_03', 'bar_04', 'bar_05', 'bar_06'];

function WaveSpinnerComponent() {
  return (
    <div className="rl-spinner rl-spinner_type_wave">
      {bars.map((bar) => (
        <div key={bar} className="rl-spinner__bar" />
      ))}
    </div>
  );
}

export const WaveSpinner = memo(WaveSpinnerComponent);
