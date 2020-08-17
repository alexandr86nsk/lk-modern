/* ********************* zone ***************** */
import requestParser from '../requestParser';

export const zoneStoreGetZones = () => requestParser({
  method: 'get',
  url: 'zoneApp',
});

export const zoneStoreGetSubZones = (zoneId) => requestParser({
  method: 'get',
  url: `subZoneApp/zone/${zoneId}`,
});

export const zoneStoreGetZoneInfo = (id) => requestParser({
  method: 'get',
  url: `zoneApp/${id}`,
});

export const zoneStoreGetSubZoneInfo = (id) => requestParser({
  method: 'get',
  url: `subZoneApp/${id}`,
});

export const zoneStoreSaveZone = (data) => requestParser({
  method: 'put',
  url: 'zoneApp',
  data,
});

export const zoneStoreSaveSubZone = (data) => requestParser({
  method: 'put',
  url: 'subZoneApp',
  data,
});

export const zoneStoreAddZone = (data) => requestParser({
  method: 'post',
  url: 'zoneApp',
  data,
});

export const zoneStoreAddSubZone = (data) => requestParser({
  method: 'post',
  url: 'subZoneApp',
  data,
});

export const zoneStoreRemoveZone = (id) => requestParser({
  method: 'delete',
  url: `zoneApp/${id}`,
});

export const zoneStoreRemoveSubZone = (id) => requestParser({
  method: 'delete',
  url: `subZoneApp/${id}`,
});

export const zoneStoreGetUsers = (roleName) => requestParser({
  method: 'get',
  url: `user/role/${roleName}`,
});

export const zoneStoreAddZoneUser = (data) => requestParser({
  method: 'post',
  url: 'zoneApp/users',
  data,
});

export const zoneStoreAddSubZoneUser = (data) => requestParser({
  method: 'post',
  url: 'subZoneApp/users',
  data,
});
