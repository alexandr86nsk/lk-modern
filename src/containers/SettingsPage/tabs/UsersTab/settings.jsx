const usersTableConfig = [
  {
    id: 0,
    title: 'Фамилия',
    dataKey: 'lastName',
    width: 90,
    fixed: true,
    column: {
      sortable: true,
    },
  },
  {
    id: 1,
    title: 'Имя',
    dataKey: 'firstName',
    width: 90,
    column: {
      sortable: true,
    },
  },
  {
    id: 2,
    title: 'Отчество',
    dataKey: 'lastName',
    width: 90,
    column: {
      sortable: true,
    },
  },
  {
    id: 2,
    title: 'Телефон',
    dataKey: 'phone',
    width: 110,
    column: {
      sortable: true,
    },
  },
  {
    id: 3,
    title: 'Дата рождения',
    dataKey: 'birthDay',
    type: 'date',
    column: {
      sortable: true,
    },
  },
  /*  {
      id: 2,
      title: 'Статус',
      dataKey: 'Status',
      type: 'component',
      width: 250,
      column: {
        sortable: true,
      },
      component: (data) => (
        <div className={`briefcase-list__item-status ellipsis-element ${briefStatusColorOptions[data.Status]}`}>
          {briefStatusOptions[data.Status]}
        </div>
      ),
    }, */
  {
    id: 4,
    title: 'Действия',
    type: 'actions',
    fixed: 'right',
    width: 90,
  },
];

export default usersTableConfig;
