const inputsTemplate = [
  {
    id: 0,
    title: 'Test0',
    dataKey: 'test0',
    elementType: 'input',
    otherProps: {
      isPassword: true,
      type: 'transparent',
    },
  },
  {
    id: 1,
    title: 'Test1',
    dataKey: 'test1',
    elementType: 'input',
    otherProps: {
      required: true,
      type: '',
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
    title: 'Test2',
    dataKey: 'test2',
    elementType: 'input',
    otherProps: {
      required: true,
      type: 'transparent',
    },
  },
  {
    id: 3,
    title: 'Test3',
    dataKey: 'test3',
    elementType: 'input',
    otherProps: {
      required: true,
    },
  },
  {
    id: 4,
    title: 'Test4Test4Test4Test4Test4Test4Test4Test4Test4Test4Test4Test4Test4Test4Test4Test4Test4Test4Test4Test4Test4Test4Test4Test4Test4Test4',
    dataKey: 'test4',
    elementType: 'input',
    otherProps: {
      required: true,
      minLength: 3,
      isEmail: true,
      hint: true,
      hintMessage: 'Хинт появляется сверху от элемента к которому относится.',
    },
  },
  {
    id: 5,
    title: 'Test5',
    dataKey: 'test5',
    elementType: 'input',
    otherProps: {
      type: 'transparent',
      hint: true,
      hintMessage: 'Хинт появляется сверху от элемента к которому относится. Если сверху нет места — открывается вниз.'
        + ' Можно указать приоритет — сверху или снизу, и даже слева или справа.',
    },
  },
  {
    id: 6,
    title: 'Test6',
    dataKey: 'test6',
    elementType: 'input',
    otherProps: {
      required: true,
      mask: '000',
      type: '',
      minLength: 3,
      hint: true,
      hintMessage: 'Хинт появляется сверху от элемента к которому относится. Если сверху нет места — открывается вниз.'
        + ' Можно указать приоритет — сверху или снизу, и даже слева или справа.',
    },
  },
  {
    id: 7,
    title: 'Test7',
    dataKey: 'test7',
    elementType: 'input',
    otherProps: {
      required: true,
      mask: '000',
      type: 'transparent',
    },
  },
  {
    id: 8,
    title: 'Test8',
    dataKey: 'test8',
    elementType: 'input',
    otherProps: {
      required: true,
      mask: '000',
    },
  },
  {
    id: 9,
    title: 'Test9',
    dataKey: 'test9',
    elementType: 'input',
    otherProps: {
      required: true,
      isMoney: true,
    },
  },
  {
    id: 10,
    title: 'Test10',
    dataKey: 'test10',
    elementType: 'input',
    otherProps: {
      isPassword: true,
      type: 'style-1c transparent',
    },
  },
  {
    id: 11,
    title: 'Test11',
    dataKey: 'test11',
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
    id: 12,
    title: 'Test12',
    dataKey: 'test12',
    elementType: 'input',
    otherProps: {
      required: true,
      type: 'style-1c transparent',
    },
  },
  {
    id: 13,
    title: 'Test13Test13Test13Test13Test13Test13Test13Test13Test13Test13Test13Test13Test13Test13Test13Test13Test13Test13Test13Test13Test13Test13Test13Test13Test13Test13Test13Test13Test13',
    dataKey: 'test13',
    elementType: 'input',
    otherProps: {
      required: true,
      type: 'style-1c',
    },
  },
  {
    id: 14,
    title: 'Test14',
    dataKey: 'test14',
    elementType: 'input',
    otherProps: {
      required: true,
      minLength: 3,
      isEmail: true,
      type: 'style-1c',
    },
  },
  {
    id: 15,
    title: 'Test15',
    dataKey: 'test15',
    elementType: 'input',
    otherProps: {
      type: 'style-1c transparent',
      hint: true,
      hintMessage: 'Хинт появляется сверху от элемента к которому относится. Если сверху нет места — открывается вниз.'
        + ' Можно указать приоритет — сверху или снизу, и даже слева или справа.',
    },
  },
  {
    id: 16,
    title: 'Test16Test16Test16Test16Test16Test16Test16Test16Test16Test16Test16Test16Test16Test16Test16Test16Test16Test16Test16',
    dataKey: 'test16',
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
    id: 17,
    title: 'Test17',
    dataKey: 'test17',
    elementType: 'input',
    otherProps: {
      type: 'style-1c transparent',
    },
  },
  {
    id: 18,
    title: 'Test18',
    dataKey: 'test18',
    elementType: 'input',
    otherProps: {
      required: true,
      mask: '000',
      type: 'style-1c',
    },
  },
  {
    id: 19,
    title: 'Test19',
    dataKey: 'test19',
    elementType: 'input',
    otherProps: {
      type: 'style-1c translate-title',
    },
  },
  {
    id: 20,
    title: 'Test20Test20Test20Test20Test20Test20Test20Test20Test20Test20Test20',
    dataKey: 'test20',
    elementType: 'input',
    otherProps: {
      type: 'style-1c translate-title',
    },
  },
  {
    id: 21,
    title: 'Test21',
    dataKey: 'test21',
    elementType: 'input',
    otherProps: {
      required: true,
      mask: '000',
      type: 'style-1c vertical',
    },
  },
  {
    id: 22,
    title: 'Test22Test22Test22Test22Test22Test22Test22Test22Test22Test22Test22Test22Test22Test22Test22Test22Test22Test22Test22Test22Test22Test22',
    dataKey: 'test22',
    elementType: 'input',
    otherProps: {
      required: true,
      type: 'style-1c vertical',
      hint: true,
      hintMessage: 'Хинт появляется сверху от элемента к которому относится. Если сверху нет места — открывается вниз.'
        + ' Можно указать приоритет — сверху или снизу, и даже слева или справа.',
    },
  },
  {
    id: 23,
    title: 'Test20Test20Test20Test20Test20Test20Test20Test20Test20Test20Test20Test20Test20Test20Test20Test20Test20',
    dataKey: 'test23',
    elementType: 'input',
    otherProps: {
      type: 'style-1c vertical',
    },
  },
];

export default inputsTemplate;
