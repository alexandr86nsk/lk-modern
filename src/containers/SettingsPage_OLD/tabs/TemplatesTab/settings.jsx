const templatesTableConfig = [
  {
    id: 0,
    title: 'Название шаблона',
    dataKey: 'name',
    width: 150,
    fixed: true,
    column: {
      sortable: true,
    },
  },
  {
    id: 1,
    title: 'Текст шаблона',
    dataKey: 'text',
    column: {
      sortable: true,
    },
  },
  {
    id: 2,
    title: 'Дата создания',
    dataKey: 'createAt',
    type: 'date',
    width: 150,
    column: {
      sortable: true,
    },
  },
  {
    id: 3,
    title: 'Автор',
    dataKey: 'authorFIO',
    width: 250,
    column: {
      sortable: true,
    },
  },
  {
    id: 4,
    title: 'Действия',
    type: 'actions',
    fixed: 'right',
    width: 80,
  },
];

export default templatesTableConfig;
