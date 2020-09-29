const menuTemplate = [
  {
    id: 0,
    title: 'Детали задания',
    description: 'ctrl + a',
    value: 'jobDetailReport',
    label: { color: 'purple', empty: true, circular: true },
  },
  {
    id: 1,
    title: 'Статус задания',
    description: 'ctrl + o',
    value: 'jobStatusReport',
    label: { color: 'pink', empty: true, circular: true },
  },
  {
    id: 2,
    title: 'Динамическая история задания',
    description: 'ctrl + s',
    value: 'jobHistoryReport',
    label: { color: 'yellow', empty: true, circular: true },
  },
  {
    id: 3,
    title: 'Эффективность работы сотрудников',
    description: 'ctrl + r',
    value: 'jobCallHandlingReport',
    label: { color: 'orange', empty: true, circular: true },
  },
];

export default menuTemplate;
