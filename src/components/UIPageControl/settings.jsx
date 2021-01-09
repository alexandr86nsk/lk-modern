import React from 'react';
import BackIcon from '../../assetssadads/icons/arrow_back-24px.svg';
import DeleteIcon from '../../assetssadads/icons/delete_forever-24px.svg';
import CompleteIcon from '../../assetssadads/icons/check-24px.svg';
import AddIcon from '../../assetssadads/icons/add-24px.svg';

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
