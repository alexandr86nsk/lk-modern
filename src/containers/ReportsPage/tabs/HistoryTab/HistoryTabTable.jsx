import React from 'react';
import { connect } from 'react-redux';
import { Table, Progress } from 'semantic-ui-react';
import * as moment from 'moment';
import _ from 'lodash';
import actions from '../../../../redux/actions/actions';
import UILoader from '../../../../components/UILoader/UILoader';

const colors = [
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'teal',
  'blue',
  'violet',
  'purple',
  'pink',
  'brown',
  'grey',
  'black',
];

function HistoryTabTable(props) {
  const {
    dataLoaded,
    data = {},
  } = props;

  const {
    CauseResults = [],
  } = data;

  moment.locale('ru');

  const renderResults = React.useMemo(
    () => _.sortBy(CauseResults, 'Percentage').reverse().map((v, index) => (
      <Table.Row key={v.CauseId}>
        <Table.Cell>{v.CauseId || ''}</Table.Cell>
        <Table.Cell colSpan="2">{v.CauseName || ''}</Table.Cell>
        <Table.Cell collapsing>
          {v.CauseDescription || ''}
        </Table.Cell>
        <Table.Cell>
          {v.Count || ''}
        </Table.Cell>
        <Table.Cell>
          <Progress
            percent={v.Percentage}
            progress
            size="small"
            color={colors[index] || 'black'}
          />
        </Table.Cell>
      </Table.Row>
    )),
    [CauseResults],
  );

  return (
    <div className="history-table font-type-m-11">
      {!dataLoaded
      && (
        <div className="ui-table__dimmer">
          <div className="ui-table__loader">
            <UILoader size="small" text="Загрузка..." />
          </div>
        </div>
      )}
      <Table celled size="small">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="6" textAlign="center">Отчет</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>Название кампании</Table.Cell>
            <Table.Cell colSpan="5">{data.TitleBriefcase || ''}</Table.Cell>
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
              {data.CallCount || ''}
            </Table.Cell>
            <Table.Cell>
              {data.SuccessConnected || ''}
            </Table.Cell>
            <Table.Cell>
              {data.DroptCall || ''}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell collapsing>Временной интервал</Table.Cell>
            <Table.Cell collapsing>
              {`с ${data.StartDate ? moment(data.StartDate).format('DD.MM.YYYY HH:mm:ss') : ''}`}
            </Table.Cell>
            <Table.Cell collapsing>
              {`по ${data.EndDate ? moment(data.EndDate).format('DD.MM.YYYY HH:mm:ss') : ''}`}
            </Table.Cell>
            <Table.Cell>
              {data.CallCountAtTime || ''}
            </Table.Cell>
            <Table.Cell>
              {data.SuccessConnectedAtTime || ''}
            </Table.Cell>
            <Table.Cell>
              {data.DroptCallAtTime || ''}
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
    </div>
  );
}

const mapStateToProps = (state) => ({
  templatesA: state.reportsStore,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(HistoryTabTable);
