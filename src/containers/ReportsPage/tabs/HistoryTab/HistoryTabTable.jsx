import React from 'react';
import { Table, Progress } from 'semantic-ui-react';
import * as moment from 'moment';
import _ from 'lodash';
import UILoader from '../../../../components/UILoader/UILoader';
import UIMissingData from '../../../../components/UIMissingData/UIMissingData';

const colors = [
  'teal',
  'green',
  'olive',
  'yellow',
  'orange',
  'red',
  'pink',
  'purple',
  'violet',
  'blue',
  'brown',
  'black',
  'grey',
];

function HistoryTabTable(props) {
  const {
    loading,
    data,
  } = props || {};

  const {
    CauseResults,
    TitleBriefcase = '',
    CallCount = '',
    SuccessConnected = '',
    DroptCall = '',
    StartDate,
    EndDate,
    CallCountAtTime = '',
    SuccessConnectedAtTime = '',
    DroptCallAtTime = '',
  } = data || {};

  moment.locale('ru');

  const renderResults = React.useMemo(() => {
    if (CauseResults) {
      return _.sortBy(CauseResults, 'Percentage').reverse().map((v, index) => {
        const {
          CauseId = '',
          CauseName = '',
          CauseDescription = '',
          Percentage = '',
          Count = '',
        } = v || {};
        return (
          <Table.Row key={CauseId}>
            <Table.Cell>{CauseId}</Table.Cell>
            <Table.Cell colSpan="2">{CauseName}</Table.Cell>
            <Table.Cell collapsing>
              {CauseDescription}
            </Table.Cell>
            <Table.Cell>
              {Count}
            </Table.Cell>
            <Table.Cell>
              <Progress
                percent={Percentage}
                progress
                active
                size="small"
                color={colors[index] || 'grey'}
              />
            </Table.Cell>
          </Table.Row>
        );
      });
    } return null;
  },
  [CauseResults]);

  return (
    <div className={`history-table${!dataLoaded ? ' loading' : ''}`}>
      {loading && <UILoader text="Загрузка" type="--google" dimmed />}
      <div className="history-table__body">
        {!loading && data && (
        <Table celled size="small">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="6" textAlign="center">Отчет</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Название кампании</Table.Cell>
              <Table.Cell colSpan="5">{TitleBriefcase}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell colSpan="6" />
            </Table.Row>
            <Table.Row className="history-table__row-header">
              <Table.Cell colSpan="3" />
              <Table.Cell>Звонки</Table.Cell>
              <Table.Cell collapsing>Соединение</Table.Cell>
              <Table.Cell>Потерянный вызов</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell colSpan="3">Всего</Table.Cell>
              <Table.Cell>
                {CallCount}
              </Table.Cell>
              <Table.Cell>
                {SuccessConnected}
              </Table.Cell>
              <Table.Cell>
                {DroptCall}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Временной интервал</Table.Cell>
              <Table.Cell collapsing>
                {`с ${StartDate ? moment(StartDate).format('DD.MM.YYYY HH:mm:ss') : ''}`}
              </Table.Cell>
              <Table.Cell collapsing>
                {`по ${EndDate ? moment(EndDate).format('DD.MM.YYYY HH:mm:ss') : ''}`}
              </Table.Cell>
              <Table.Cell>
                {CallCountAtTime}
              </Table.Cell>
              <Table.Cell>
                {SuccessConnectedAtTime}
              </Table.Cell>
              <Table.Cell>
                {DroptCallAtTime}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell colSpan="6" />
            </Table.Row>
            <Table.Row className="history-table__row-header">
              <Table.Cell>Код завершения</Table.Cell>
              <Table.Cell colSpan="2">Расшифровка кода</Table.Cell>
              <Table.Cell>Описание события</Table.Cell>
              <Table.Cell>Количественные показатели</Table.Cell>
              <Table.Cell>Процентные показатели</Table.Cell>
            </Table.Row>
            {renderResults}
          </Table.Body>
        </Table>
        )}
        {!loading && !data && <UIMissingData />}
      </div>
    </div>
  );
}

export default HistoryTabTable;
