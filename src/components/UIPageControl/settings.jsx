import React from 'react';
import BackIcon from '../../static/images/arrow_back-24px.svg';
import DeleteIcon from '../../static/images/delete_forever-24px.svg';
import CompleteIcon from '../../static/images/check-24px.svg';
import AddIcon from '../../static/images/add-24px.svg';

const controlButtons = [
  {
    id: 0,
    title: 'Назад',
    type: 'back',
    icon: <BackIcon />,
  },
  {
    id: 1,
    title: 'Добавить',
    type: 'add',
    icon: <AddIcon />,
  },
  {
    id: 2,
    title: 'Удалить',
    type: 'delete',
    icon: <DeleteIcon />,
  },
  {
    id: 3,
    title: 'Сохранить',
    type: 'save',
    icon: <CompleteIcon />,
  },
  {
    id: 4,
    title: 'Выполнить',
    type: 'complete',
    icon: <CompleteIcon />,
  },
];

export default controlButtons;
