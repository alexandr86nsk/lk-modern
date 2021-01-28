import React, { memo } from 'react';

import './styles.scss';

function BasicSpinnerComponent() {
  return <div className="rl-spinner rl-spinner_type_basic" />;
}

export const BasicSpinner = memo(BasicSpinnerComponent);
