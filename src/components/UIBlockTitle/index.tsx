import React from 'react';
import './styles.scss';

type PropsType = {
  title: string;
};

function BlockTitle(props: PropsType) {
  const { title = '' } = props;
  return (
    <div className="ui-block-title">
      <div className="ui-block-title__main">{title}</div>
      <div className="ui-block-title__sub">{`Вы находитесь в панели ${title}`}</div>
    </div>
  );
}

export const UIBlockTitle = React.memo(BlockTitle);
