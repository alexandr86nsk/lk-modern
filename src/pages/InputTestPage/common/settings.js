const inputsTemplate = [
  {
    id: 0,
    title: 'Test1',
    dataKey: 'test1',
    type: 'input',
    otherProps: {
      type: 'style-1c transparent',
    },
  },
  {
    id: 1,
    title: 'Test2',
    dataKey: 'test2',
    type: 'input',
    otherProps: {
      required: true,
      mask: '000',
      type: 'style-1c transparent',
      minLength: 3,
      hint: true,
    },
  },
  {
    id: 2,
    title: 'Test3',
    dataKey: 'test3',
    type: 'input',
    otherProps: {
      required: true,
      mask: '000',
      type: 'style-1c transparent',
    },
  },
  {
    id: 3,
    title: 'Test4',
    dataKey: 'test4',
    type: 'input',
    otherProps: {
      required: true,
      mask: '000',
    },
  },
  {
    id: 4,
    title: 'Test5',
    dataKey: 'test5',
    type: 'input',
    otherProps: {
      required: true,
      minLength: 3,
      isEmail: true,
    },
  },
];

export default inputsTemplate;
