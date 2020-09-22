/* ********************* zone ***************** */
import requestParser_with_refresh_token from '../requestParser_with_refresh_token';

export const zoneStoreGetZones = () => requestParser_with_refresh_token({
  method: 'get',
  url: 'zoneApp',
});

export const zoneStoreGetSubZones = (zoneId) => requestParser_with_refresh_token({
  method: 'get',
  url: `subZoneApp/zone/${zoneId}`,
});

export const zoneStoreGetZoneInfo = (id) => requestParser_with_refresh_token({
  method: 'get',
  url: `zoneApp/${id}`,
});

export const zoneStoreGetSubZoneInfo = (id) => requestParser_with_refresh_token({
  method: 'get',
  url: `subZoneApp/${id}`,
});

export const zoneStoreSaveZone = (data) => requestParser_with_refresh_token({
  method: 'put',
  url: 'zoneApp',
  data,
});

export const zoneStoreSaveSubZone = (data) => requestParser_with_refresh_token({
  method: 'put',
  url: 'subZoneApp',
  data,
});

export const zoneStoreAddZone = (data) => requestParser_with_refresh_token({
  method: 'post',
  url: 'zoneApp',
  data,
});

export const zoneStoreAddSubZone = (data) => requestParser_with_refresh_token({
  method: 'post',
  url: 'subZoneApp',
  data,
});

export const zoneStoreRemoveZone = (id) => requestParser_with_refresh_token({
  method: 'delete',
  url: `zoneApp/${id}`,
});

export const zoneStoreRemoveSubZone = (id) => requestParser_with_refresh_token({
  method: 'delete',
  url: `subZoneApp/${id}`,
});

export const zoneStoreGetUsers = (roleName) => requestParser_with_refresh_token({
  method: 'get',
  url: `user/role/${roleName}`,
});

export const zoneStoreAddZoneUser = (data) => requestParser_with_refresh_token({
  method: 'post',
  url: 'zoneApp/users',
  data,
});

export const zoneStoreAddSubZoneUser = (data) => requestParser_with_refresh_token({
  method: 'post',
  url: 'subZoneApp/users',
  data,
});
