import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';
import * as moment from 'moment';
import {
  Cell, Legend, Pie, PieChart, ResponsiveContainer,
} from 'recharts';
import actions from '../../../redux/actions/actions';
import UIReactSelect from '../../../components/UIReactSelect/UIReactSelect';
import UILoader from '../../../components/UILoader/UILoader';

moment.locale('ru');

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const RADIAN = Math.PI / 180;

const keyVariables = {
  AverageIdleTime: 'Среднее время ожидания',
  AveragePostTime: 'Среднее время пост.вызова',
  AverageTalkingTime: 'Среднее время разговора',
  TotalOperators: 'Количество людей',
  UtilizationPercentage: 'Эффективность работы сотрудников',
};

const stringToDate = (string) => {
  const matches = string.match(/^(\d):(\d{2}):(\d{2})$/);
  if (matches) {
    const timeArr = string.split(':');
    return (timeArr[0] * 3600000) + (timeArr[1] * 60000) + (timeArr[2] * 1000);
  }
  return 0;
};

const JobCallHandlingReport = (props) => {
  const {
    item,
    reportsGridStoreGetJobCallHandlingReport,
    reportsGridStoreGetJobCallHandlingReportCancel,
    reportsGridStoreSetReportSection,
    briefcases,
  } = props || {};

  const {
    id,
    data,
    selectedBriefcase,
    loading,
  } = item || {};

  const {
    AverageIdleTime,
    AveragePostTime,
    AverageTalkingTime,
  } = data || {};

  const memoizedPieData = React.useMemo(() => {
    const talkTime = AverageTalkingTime ? stringToDate(AverageTalkingTime) : 0;
    const postTime = AveragePostTime ? stringToDate(AveragePostTime) : 0;
    const idleTime = AverageIdleTime ? stringToDate(AverageIdleTime) : 0;
    const total = talkTime + postTime + idleTime;
    const AverageTalkingTimePercent = AverageTalkingTime && total
      ? ((talkTime / total) * 100).toFixed(0)
      : 0;
    const AveragePostTimePercent = AveragePostTime && total
      ? ((postTime / total) * 100).toFixed(0)
      : 0;
    const AverageIdleTimePercent = AverageIdleTime && total
      ? ((idleTime / total) * 100).toFixed(0)
      : 0;
    return [
      {
        name: 'Среднее время разговора',
        value: +AverageTalkingTimePercent,
      },
      {
        name: 'Среднее время пост.вызова',
        value: +AveragePostTimePercent,
      },
      {
        name: 'Среднее время ожидание',
        value: +AverageIdleTimePercent,
      },
    ];
  }, [AverageTalkingTime, AveragePostTime, AverageIdleTime]);

  React.useEffect(() => {
    if (selectedBriefcase) {
      reportsGridStoreGetJobCallHandlingReport({
        id,
        selectedBriefcase,
      });
    }
  }, [id, selectedBriefcase, reportsGridStoreGetJobCallHandlingReport]);

  React.useEffect(() => () => {
    reportsGridStoreGetJobCallHandlingReportCancel();
  }, [reportsGridStoreGetJobCallHandlingReportCancel]);

  const handleChangeFilter = React.useCallback((editName, editValue) => {
    reportsGridStoreSetReportSection({
      id,
      [editName]: editValue,
    });
  }, [id, reportsGridStoreSetReportSection]);

  const renderTableContent = React.useMemo(() => {
    if (data) {
      return Object.keys(data).map((v) => (
        <Table.Row key={v}>
          <Table.Cell><span className={`${v}`}>{keyVariables[v] || v}</span></Table.Cell>
          <Table.Cell>{v.includes('Date') ? moment(data[v]).format('DD.MM.YYYY HH:mm:ss') : data[v]}</Table.Cell>
        </Table.Row>
      ));
    }
    return null;
  },
  [data]);

  const renderPieContent = React.useMemo(
    () => memoizedPieData.map((entry, index) => (<Cell key={`cell-${entry}`} fill={COLORS[index]} />)), [memoizedPieData],
  );

  const renderCustomizedLabel = React.useCallback(({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  }, []);

  return (
    <div className="job-call-handling-report">
      <div className="report__filter">
        <UIReactSelect
          name="selectedBriefcase"
          options={briefcases || []}
          data={selectedBriefcase}
          callback={handleChangeFilter}
          placeholder="Выберите кампанию"
        />
      </div>
      <div className="job-call-handling-report__body">
        {loading
        && (
          <div className="job-call-handling-report__loader">
            <UILoader text="Идет загрузка данных..." />
          </div>
        )}
        <div className="job-call-handling-report__chart">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                dataKey="value"
                data={memoizedPieData}
                labelLine={false}
                label={renderCustomizedLabel}
              >
                {renderPieContent}
              </Pie>
              <Legend verticalAlign="bottom" height={45} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="job-call-handling-report__table">
          <Table selectable celled fixed size="small">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Данные</Table.HeaderCell>
                <Table.HeaderCell>Значение</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {renderTableContent}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  briefcases: state.reportsGridStore.briefcases,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(JobCallHandlingReport);
