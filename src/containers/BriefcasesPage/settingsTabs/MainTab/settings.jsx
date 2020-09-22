const queueAsteriskSettingsTemplate = [
  {
    id: 0,
    title: 'Номер очереди',
    data: 'QueuePhone',
    type: 'input',
    validation: {
      disabled: true,
      type: '--style-1c',
    },
  },
  {
    id: 1,
    title: 'Кол-во линий(ручное)',
    data: 'QueueLimitCoefficient',
    type: 'input',
    validation: {
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
    data: 'CalcQueueLimitCoefficient',
    type: 'input',
    validation: {
      disabled: true,
      type: '--style-1c',
    },
  },
  {
    id: 3,
    title: 'Кол-во одновременно набираемых номеров(max)',
    data: 'QueueLimitCoefficientPerOperatorMax',
    type: 'input',
    validation: {
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
    data: 'QueueLimitCoefficientPerOperatorMin',
    type: 'input',
    validation: {
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
    data: 'ControlType',
    type: 'select',
    validation: {
      required: true,
      type: '--style-1c',
    },
  },
  {
    id: 6,
    title: 'Скорость',
    data: 'Work',
    type: 'input',
    validation: {
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
    data: 'AcceptPercentLostCalls',
    type: 'input',
    validation: {
      required: true,
      successFormat: 'Обязательное поле',
      minLength: 1,
      mask: '000',
      type: '--style-1c',
    },
  },
  {
    id: 8,
    title: 'Время набора номера',
    data: 'OutgoingGroupNumber',
    type: 'input',
    validation: {
      mask: '000',
      type: '--style-1c',
    },
  },
];

export default queueAsteriskSettingsTemplate;
