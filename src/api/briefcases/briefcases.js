import requestParserWithoutToken from '../requestParserWithoutToken';

export const getQueueAsteriskList = () => requestParserWithoutToken({
  method: 'get',
  url: 'QueueAsteriskOptions/GetList',
});

export const getBriefCases = () => requestParserWithoutToken({
  method: 'get',
  url: 'Briefcase/GetList',
});
