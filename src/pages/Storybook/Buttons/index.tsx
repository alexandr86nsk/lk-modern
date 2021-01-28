import React, { memo } from 'react';

import './styles.scss';

import { Button } from '@components/Button';
import { Storybook } from '@components/Storybook';

function ButtonsComponent() {
  return (
    <div className="storybook__buttons">
      <Storybook>
        <Button />
        <Button text="Close" hasRipple />
      </Storybook>
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <Button text="Close" hasRipple />
        <Button text="Close" theme="primary" hasRipple isLoading />
        <Button icon="mailOutline" isCompact />
        <Button icon="mailOutline" isCompact isLoading />
        <Button icon="mailOutline" isLoading />
        <Button icon="emailAlternate" size="xs" isInverted />
        <Button icon="emailAlternate" size="xs" text="Send" isInverted />
        <Button icon="mailOutline" size="md" theme="positive" isCircular hasRipple />
        <Button icon="mailOutline" size="md" theme="positive" isCircular isInverted hasRipple />
        <Button text="Open" icon="search" size="sm" theme="negative" />
        <Button text="Open" icon="search" size="sm" theme="negative" isInverted />
        <Button text="Search" icon="search" theme="primary" size="sm" iconPosition="right" />
        <Button
          text="Search"
          icon="search"
          theme="primary"
          size="sm"
          isInverted
          iconPosition="right"
        />
        <Button text="Search" icon="search" theme="negative" isFluid isGhost />
        <Button text="Search" icon="search" theme="positive" isGhost hasRipple />
        <Button text="Hide" icon="search" isGhost hasRipple />
        <Button text="Search" icon="search" theme="positive" isInverted isGhost />
        <Button text="Search" icon="search" theme="secondary" size="xxxl" hasRipple isInverted />
        <Button
          text="Search"
          icon="search"
          theme="secondary"
          size="xxxl"
          hasRipple
          isInverted
          isLoading
        />
        <Button text="Search" icon="mailOutline" theme="secondary" size="xs" hasRipple />
        <Button text="Search" icon="mailOutline" size="xs" isCompact />
        <Button text="Find" icon="warningOutline" size="sm" hasRipple isCompact />
        <Button icon="mailOutline" size="sm" isCircular hasRipple />
        <Button icon="check" size="xs" isCircular />
        <Button icon="mailOutline" size="sm" isCircular isGhost hasRipple />
        <Button icon="mailOutline" size="sm" text="Send" hasRipple isOutline />
        <Button icon="check" size="xs" text="Send" theme="negative" isOutline hasRipple />
        <Button
          icon="check"
          size="xs"
          text="Send"
          theme="negative"
          isOutline
          hasRipple
          isInverted
        />
        <Button icon="mailOutline" size="sm" isCircular isGhost hasRipple isLoading />
        <Button icon="mailOutline" size="sm" text="Send" hasRipple isOutline isLoading />
        <Button
          icon="mailOutline"
          size="sm"
          text="Send"
          theme="primary"
          hasRipple
          isOutline
          isLoading
        />
        <Button icon="mailOutline" size="sm" theme="positive" isCircular hasRipple isLoading />
        <Button icon="mailOutline" size="sm" text="Send" hasRipple isLoading />
        <Button
          icon="mailOutline"
          size="sm"
          text="Send"
          theme="primary"
          hasRipple
          isInverted
          isLoading
        />
        <Button icon="mailOutline" size="sm" theme="positive" isCircular hasRipple isDisabled />
        <Button icon="mailOutline" size="sm" text="Send" hasRipple isDisabled />
        <Button
          icon="mailOutline"
          size="sm"
          text="Send"
          theme="primary"
          hasRipple
          isInverted
          isDisabled
        />
        <Button icon="mailOutline" size="sm" text="Send" isGhost hasRipple isDisabled />
        <Button
          icon="mailOutline"
          size="sm"
          text="Send"
          theme="positive"
          isGhost
          hasRipple
          isInverted
          isDisabled
          isLoading
        />
      </div>
    </div>
  );
}

export const Buttons = memo(ButtonsComponent);
