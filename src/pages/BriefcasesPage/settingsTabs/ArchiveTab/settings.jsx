import React from 'react';
import DropdownMenu from '../../../../components/UITable/common/DropdownMenu';

export const queuePhoneTableHeader = [
  {
    id: 0,
    title: 'Номер очереди',
    value: 'QueuePhone',
    type: '',
    options: [],
  },
  {
    id: 1,
    title: 'Кол-во линий(ручное)',
    value: 'QueueLimitCoefficient',
    type: '',
  },
  {
    id: 2,
    title: 'Кол-во линий(автоматическое)',
    value: 'CalcQueueLimitCoefficient',
    type: '',
  },
  {
    id: 3,
    title: 'Кол-во одновременно набираемых номеров(max)',
    value: 'QueueLimitCoefficientPerOperatorMax',
    type: '',
  },
  {
    id: 4,
    title: 'Кол-во одновременно набираемых номеров(min)',
    value: 'QueueLimitCoefficientPerOperatorMin',
    type: '',
  },
  {
    id: 5,
    title: 'Тип управления',
    value: 'ControlType',
    type: 'options-select',
    options: [],
  },
  {
    id: 6,
    title: 'Скорость',
    value: 'Work',
    type: '',
  },
  {
    id: 7,
    title: 'Допустимый процент брака',
    value: 'AcceptPercentLostCalls',
    type: '',
  },
  {
    id: 8,
    title: '',
    value: '',
    type: 'actions',
    component: (data, actions) => (
      <DropdownMenu data={data} actions={actions} />
    ),
  },
];

export const queuePhoneItem = [
  {
    id: 0,
    title: 'Номер очереди',
    data: 'QueuePhone',
    type: 'input',
    validation: {
      disabled: true,
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
      mask: '000',
    },
  },
  {
    id: 2,
    title: 'Кол-во линий(автоматическое)',
    data: 'CalcQueueLimitCoefficient',
    type: 'input',
    validation: {
      disabled: true,
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
      mask: '000',
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
      mask: '000',
    },
  },
  {
    id: 5,
    title: 'Тип управления',
    data: 'ControlType',
    type: 'select',
    validation: {
      required: true,
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
      mask: '000',
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
      mask: '000',
    },
  },
];
