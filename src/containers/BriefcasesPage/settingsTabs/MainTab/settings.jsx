const queueMainSettingsTemplate = [
  {
    id: 0,
    title: 'Номер очереди',
    dataKey: 'QueuePhone',
    type: 'input',
    otherProps: {
      disabled: true,
      type: '--style-1c',
    },
  },
  {
    id: 1,
    title: 'Кол-во линий(ручное)',
    dataKey: 'QueueLimitCoefficient',
    type: 'input',
    otherProps: {
      required: true,
      successFormat: 'Обязательное поле',
      minLength: 1,
      mask: '000',
      type: '--style-1c',
    },
  },
  {
    id: 2,
    title: 'Кол-во линий(автоматическое)',
    dataKey: 'CalcQueueLimitCoefficient',
    type: 'input',
    otherProps: {
      disabled: true,
      type: '--style-1c',
    },
  },
  {
    id: 3,
    title: 'Кол-во одновременно набираемых номеров(max)',
    dataKey: 'QueueLimitCoefficientPerOperatorMax',
    type: 'input',
    otherProps: {
      required: true,
      successFormat: 'Обязательное поле',
      minLength: 1,
      mask: '000',
      type: '--style-1c',
    },
  },
  {
    id: 4,
    title: 'Кол-во одновременно набираемых номеров(min)',
    dataKey: 'QueueLimitCoefficientPerOperatorMin',
    type: 'input',
    otherProps: {
      required: true,
      successFormat: 'Обязательное поле',
      minLength: 1,
      mask: '000',
      type: '--style-1c',
    },
  },
  {
    id: 5,
    title: 'Тип управления',
    dataKey: 'ControlType',
    type: 'select',
    otherProps: {
      required: true,
      type: '--style-1c',
    },
  },
  {
    id: 6,
    title: 'Скорость',
    dataKey: 'Work',
    type: 'input',
    otherProps: {
      required: true,
      successFormat: 'Обязательное поле',
      minLength: 1,
      mask: '000',
      type: '--style-1c',
    },
  },
  {
    id: 7,
    title: 'Допустимый процент брака',
    dataKey: 'AcceptPercentLostCalls',
    type: 'input',
    otherProps: {
      required: true,
      successFormat: 'Обязательное поле',
      minLength: 1,
      mask: '000',
      type: '--style-1c',
    },
  },
];

export default queueMainSettingsTemplate;
