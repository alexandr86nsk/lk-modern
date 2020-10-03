import React from 'react';
import { Table, Icon } from 'semantic-ui-react';
import * as moment from 'moment';

moment.locale('ru');

const keyVariables = {
  CallPercentage: '% звонков',
  CallConnectedPercentage: '% соединений',
  CallDropPercentage: '% потерянных',
  CR: 'Контактность CR',
  RPC: '% должников RPC',
  PromisesPercentage: '% обещаний от соединений',
  RPCPromises: '% Обещаний от RPC',
  ItemsCount: 'Количество строк в капмании',
  PhoneNumCount: 'Количество номеров в задании',
  TotalCallCount: 'Количество попыток',
  TotalCallCountDial: 'Количество звонков',
  TotalCallConnected: 'Количество соединений оператора и абонента',
  TotalPromises: 'Количество обещаний',
  TotalDropCall: 'Количество потерянных соединений, находящихся в очереди',
  DebtCount: 'Количество должников  в задании',
  BriefcaseTitle: 'Название кампании',
  RecallStrategyName: 'Тип примененной стратегии',
  RecallStrategyId: 'ИД примененной стратегии',
  BriefcaseName: 'Идентификатор задания (технический номер задания)',
  BriefcaseStartDate: 'Дата/время запуска задания',
  BriefcasePlanEndDate: 'Предполагаемая дата',
  BriefcasePlanEndTime: 'Предполагаемый остаток времени работы задания',
  QueueLimitCoefficient: 'Текущий Hit rate (количество линий на очередь в режиме авто)',
  CalcQueueLimitCoefficient: 'Рекомендуемый Hit rate (количество линий расчетное в режиме авто)',
};

const JobDetailReportItem = (props) => {
  const {
    data,
    title,
  } = props || {};

  const [height, setHeight] = React.useState('auto');

  const handleActiveClick = React.useCallback(() => {
    setHeight(height ? 0 : 'auto');
  }, [height]);

  const renderContent = React.useMemo(() => {
    if (height) {
      return Object.keys(data).map((v) => {
        const { [v]: dataValue } = data || {};
        return (
          <Table.Row key={v}>
            <Table.Cell>{keyVariables[v] || v}</Table.Cell>
            <Table.Cell>{v.includes('Date') ? moment(dataValue).format('DD.MM.YYYY HH:mm:ss') : dataValue}</Table.Cell>
          </Table.Row>
        );
      });
    }
    return null;
  },
  [height, data]);

  return (
    <>
      <Table.Row>
        <Table.Cell colSpan="2" singleLine className="job-detail-report__table-subtitle">
          <Icon
            name={height ? 'minus square outline' : 'plus square outline'}
            onClick={handleActiveClick}
            className="job-detail-report__table-expand-btn"
          />
          <b className="ellipsis-element">{title || ''}</b>
        </Table.Cell>
      </Table.Row>
      {renderContent}
    </>
  );
};

export default React.memo(JobDetailReportItem);
