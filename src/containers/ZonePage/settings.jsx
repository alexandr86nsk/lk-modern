export const zoneInfoTemplate = [
  {
    id: 0,
    title: 'Название региона',
    dataKey: 'regionNameX',
    type: 'search',
    otherProps: {
      asInput: true,
      minLength: 1,
      required: true,
      type: '--style-1c --wrap-results',
    },
  },
  {
    id: 1,
    title: 'Тип региона',
    dataKey: 'regionTypeFull',
    type: 'input',
    otherProps: {
      type: '--style-1c',
      disabled: true,
    },
  },
  {
    id: 2,
    title: 'Код региона',
    dataKey: 'code',
    type: 'input',
    otherProps: {
      required: true,
      minLength: 1,
      isInteger: true,
      mask: '0000000',
      type: '--style-1c',
    },
  },
];

export const subZoneInfoTemplate = [
  {
    id: 0,
    title: 'Название населенного пункта',
    dataKey: 'cityNameX',
    type: 'search',
    otherProps: {
      asInput: true,
      minLength: 1,
      required: true,
      type: '--style-1c --wrap-results',
    },
  },
  {
    id: 2,
    title: 'Тип населенного пункта',
    dataKey: 'cityTypeFull',
    type: 'input',
    otherProps: {
      type: '--style-1c',
      disabled: true,
    },
  },
  {
    id: 3,
    title: 'Код населенного пункта',
    dataKey: 'subZoneCode',
    type: 'input',
    otherProps: {
      /*required: true,
      minLength: 1,
      isInteger: true,
      mask: '0000000',*/
      disabled: true,
      type: '--style-1c',
    },
  },
];

export const zoneAddressVariables = {
  country_iso_code: 'countryIsoCode',
  region_iso_code: 'regionIsoCode',
  area: 'areaName',
  area_fias_id: 'areaFiasID',
  area_type: 'areaType',
  area_type_full: 'areaTypeFull',
  city: 'cityName',
  // city_district: 'cityDistrictName',
  // city_district_fias_id: 'cityDistrictFiasID',
  // city_district_type: 'cityDistrictType',
  // city_district_type_full: 'cityDistrictTypeFull',
  city_fias_id: 'cityFiasID',
  city_type: 'cityType',
  city_type_full: 'cityTypeFull',
  // city_kladr_id: 'cityKladrId',
  fias_id: 'fiasId',
  // geo_lat: 'latitude',
  // geo_lon: 'longitude',
  source: 'fullAddress',
  kladr_id: 'kladrId',
  region: 'regionName',
  region_fias_id: 'regionFiasID',
  region_type: 'regionType',
  region_type_full: 'regionTypeFull',
  settlement: 'settlementName',
  settlement_fias_id: 'settlementFiasID',
  settlement_type: 'settlementType',
  settlement_type_full: 'settlementTypeFull',
};
