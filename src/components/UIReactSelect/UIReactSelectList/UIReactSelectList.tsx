import React from 'react';
import { FixedSizeList as List } from 'react-window';
// import { components } from 'react-select';
// import { OptionProps } from 'react-select/src/components/Option';
import { MenuListComponentProps } from 'react-select/src/components/Menu';
import { IOptions } from '../UIReactSelect';

const height = 35;

const UIReactSelectList = React.memo((props: MenuListComponentProps<IOptions>) => {
  const {
    options = [], children, maxHeight, getValue,
  } = props || {};

  const [value] = React.useMemo(() => getValue(), [getValue]);
  const initialOffset = React.useMemo(() => {
    if (options && Array.isArray(options)) {
      return options.indexOf(value) * height;
    }
    return null;
  }, [value, options]);

  const isOverflow = React.useMemo(() => {
    if (children && Array.isArray(children)) {
      const h = children.length * height;
      return h > maxHeight;
    }
    return false;
  }, [maxHeight, children]);

  if (!children || !Array.isArray(children)) return (<div className="ui-react-select__option --empty">Список пуст</div>);

  return (
    <List
      width=""
      height={isOverflow ? maxHeight : children.length * height}
      itemCount={children.length}
      itemSize={height}
      initialScrollOffset={initialOffset}
    >
      {({ index, style }) => <div style={style}>{children[index]}</div>}
    </List>
  );
});

/* function OptimizedOption(props: OptionProps<IOptions>): JSX.Element {
  const { children } = props || {};
  // eslint-disable-next-line no-param-reassign,react/destructuring-assignment
  delete props.innerProps.onMouseMove;
  // eslint-disable-next-line no-param-reassign,react/destructuring-assignment
  delete props.innerProps.onMouseOver;
  return <components.Option {...props}>{children}</components.Option>;
} */

const optimizeSelect = {
  components: {
    MenuList: UIReactSelectList,
    // Option: OptimizedOption,
  },
};

export default optimizeSelect;
