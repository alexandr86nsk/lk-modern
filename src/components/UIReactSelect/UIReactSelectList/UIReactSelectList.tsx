import React from 'react';
import { MenuListComponentProps } from 'react-select/lib/components/Menu';
import { FixedSizeList as List } from 'react-window';
import './UIReactSelectList.scss';

const height = 35;

type SelectOption = {
  value: string
  label: string
  [key: string]: string
};

const UIReactSelectList = React.memo((props: MenuListComponentProps<SelectOption>) => {
  const {
    options, children, maxHeight, getValue,
  } = props || {};
  const [value] = React.useMemo(() => getValue() as SelectOption[], [getValue]);
  const initialOffset = React.useMemo(() => options.indexOf(value) * height, [
    value,
    options,
  ]);

  return (
    <List
      height={maxHeight}
      itemCount={children.length}
      itemSize={height}
      initialScrollOffset={initialOffset}
    >
      {({ index, style }) => <div style={style}>{children[index]}</div>}
    </List>
  );
});

function OptimizedOption(props: OptionProps<SelectOption>) {
  delete props.innerProps.onMouseMove;
  delete props.innerProps.onMouseOver;
  return <components.Option {...props}>{props.children}</components.Option>;
}

const optimizeSelect = {
  components: {
    MenuList: UIReactSelectList,
    Option: OptimizedOption,
  },
};

export default optimizeSelect;
