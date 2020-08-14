/* ********************* zone ***************** */
import requestParser from '../requestParser';

export const zoneStoreGetZones = () => requestParser(
  'get',
  'zoneApp',
);

export const zoneStoreGetSubZones = (zoneId) => requestParser(
  'get',
  `subZoneApp/zone/${zoneId}`,
);

export const zoneStoreGetZoneInfo = (id) => requestParser(
  'get',
  `zoneApp/${id}`,
);

export const zoneStoreGetSubZoneInfo = (id) => requestParser(
  'get',
  `subZoneApp/${id}`,
);

export const zoneStoreSaveZone = (data) => requestParser(
  'put',
  'zoneApp',
  data,
);

export const zoneStoreSaveSubZone = (data) => requestParser(
  'put',
  'subZoneApp',
  data,
);

export const zoneStoreAddZone = (data) => requestParser(
  'post',
  'zoneApp',
  data,
);

export const zoneStoreAddSubZone = (data) => requestParser(
  'post',
  'subZoneApp',
  data,
);

export const zoneStoreGetUsers = (roleName) => requestParser(
  'get',
  `user/role/${roleName}`,
);

export const zoneStoreAddZoneUser = (data) => requestParser(
  'post',
  'zoneApp/users',
  data,
);

export const zoneStoreAddSubZoneUser = (data) => requestParser(
  'post',
  'subZoneApp/users',
  data,
);
