import React, { cloneElement } from 'react';
import './UITransition.scss';
import get from 'lodash/get';

function UITransition(props) {
  const {
    children,
    animation = 'ui-bounceIn',
    delay = 200,
  } = props;

  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => setActive(true), delay);
  }, [delay]);

  const className = React.useMemo(() => {
    const childClasses = get(children, 'props.className');
    return `${childClasses || ''} ${active ? `active ${animation}` : ''}`;
  }, [active, animation, children]);

  return (
    cloneElement(children, {
      className,
    })
  );
}

export default React.memo(UITransition);
