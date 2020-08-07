/* ********************* zone ***************** */
import requestParser from '../requestParser';

export const zoneStoreGetZones = () => requestParser(
  'get',
  'zoneApp',
);

export const zoneStoreGetZoneInfo = (id) => requestParser(
  'get',
  `zoneApp/${id}`,
);

export const zoneStoreSaveZone = (data) => requestParser(
  'put',
  'zoneApp',
  data,
);

export const zoneStoreAddZone = (data) => requestParser(
  'post',
  'zoneApp',
  data,
);

export const zoneStoreGetUsers = (roleName) => requestParser(
  'get',
  `user/role/${roleName}`,
);
