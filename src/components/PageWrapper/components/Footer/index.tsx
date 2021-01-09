import React, { memo } from 'react';
import './styles.scss';

function FooterComponent() {
  return <footer className="footer" />;
}

export const Footer = memo(FooterComponent);
