import requestParserWithoutToken from '../requestParserWithoutToken';

export const getMainSettings = () => requestParserWithoutToken({
  method: 'get',
  url: 'Settings/Get',
});

export const updateMainSettings = (data) => requestParserWithoutToken({
  method: 'post',
  url: 'Settings/Update',
  data,
});

export const getRecallSettings = () => requestParserWithoutToken({
  method: 'get',
  url: 'RetryRules/Get',
});

export const updateRecallSettings = (data) => requestParserWithoutToken({
  method: 'post',
  url: 'RetryRules/Update',
  data,
});

export const getTimeZoneSettings = () => requestParserWithoutToken({
  method: 'get',
  url: 'TimeZoneOptions/Get',
});

export const updateTimeZoneSettings = (data) => requestParserWithoutToken({
  method: 'post',
  url: 'TimeZoneOptions/Update',
  data,
});
