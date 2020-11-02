const inputsTemplate = [
  {
    id: 0,
    title: 'Test1',
    dataKey: 'test1',
    elementType: 'input',
    otherProps: {
      type: 'style-1c transparent',
    },
  },
  {
    id: 1,
    title: 'Test2',
    dataKey: 'test2',
    elementType: 'input',
    otherProps: {
      required: true,
      type: 'style-1c',
      minLength: 3,
      hint: true,
      hintMessage: 'Хинт появляется сверху от элемента к которому относится. Если сверху нет места — открывается вниз.'
        + ' Можно указать приоритет — сверху или снизу, и даже слева или справа.'
        + ' Можно указать приоритет — сверху или снизу, и даже слева или справа.'
        + ' Можно указать приоритет — сверху или снизу, и даже слева или справа.'
        + ' Можно указать приоритет — сверху или снизу, и даже слева или справа.'
        + ' Можно указать приоритет — сверху или снизу, и даже слева или справа.'
        + ' Можно указать приоритет — сверху или снизу, и даже слева или справа.'
        + ' Последнее предложение.',
    },
  },
  {
    id: 2,
    title: 'Test3',
    dataKey: 'test3',
    elementType: 'input',
    otherProps: {
      required: true,
      type: 'style-1c transparent',
    },
  },
  {
    id: 3,
    title: 'Test4',
    dataKey: 'test4',
    elementType: 'input',
    otherProps: {
      required: true,
    },
  },
  {
    id: 4,
    title: 'Test5',
    dataKey: 'test5',
    elementType: 'input',
    otherProps: {
      required: true,
      minLength: 3,
      isEmail: true,
    },
  },
  {
    id: 5,
    title: 'Test6',
    dataKey: 'test6',
    elementType: 'input',
    otherProps: {
      type: 'style-1c transparent',
      hint: true,
      hintMessage: 'Хинт появляется сверху от элемента к которому относится. Если сверху нет места — открывается вниз.'
        + ' Можно указать приоритет — сверху или снизу, и даже слева или справа.',
    },
  },
  {
    id: 6,
    title: 'Test7',
    dataKey: 'test7',
    elementType: 'input',
    otherProps: {
      required: true,
      mask: '000',
      type: 'style-1c',
      minLength: 3,
      hint: true,
      hintMessage: 'Хинт появляется сверху от элемента к которому относится. Если сверху нет места — открывается вниз.'
        + ' Можно указать приоритет — сверху или снизу, и даже слева или справа.',
    },
  },
  {
    id: 7,
    title: 'Test8',
    dataKey: 'test8',
    elementType: 'input',
    otherProps: {
      required: true,
      mask: '000',
      type: 'style-1c transparent',
    },
  },
  {
    id: 8,
    title: 'Test9',
    dataKey: 'test9',
    elementType: 'input',
    otherProps: {
      required: true,
      mask: '000',
    },
  },
  {
    id: 9,
    title: 'Test10',
    dataKey: 'test10',
    elementType: 'input',
    otherProps: {
      required: true,
      isMoney: true,
    },
  },
];

export default inputsTemplate;
