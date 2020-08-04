const initialZoneStore = {};

export default function zoneStore(state = initialZoneStore, action) {
  switch (action.type) {
    case 'ZONE_STORE_SET_SECTION':
      return {
        ...state,
        ...action.value,
      };
    case 'ZONE_STORE_SET_SUB_SECTION':
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          ...action.value,
        },
      };
    case 'ZONE_STORE_SET_ZONES_TABLE_STORE_SECTION':
      return {
        ...state,
        zonesTableStore: {
          ...state.zonesTableStore,
          ...action.value,
        },
      };
    case 'ZONE_STORE_STORE_SET_ZONES_TABLE_TEMPLATE_SECTION':
      return {
        ...state,
        zonesTableTemplate: state.zonesTableTemplate.map((v) => {
          if (v.dataKey === action.value.dataKey) {
            return {
              ...v,
              ...action.value,
            };
          }
          return v;
        }),
      };
    case 'ZONE_STORE_SET_ZONE_INFO_SECTION':
      return {
        ...state,
        zoneInfo: {
          ...state.zoneInfo,
          ...action.value,
        },
      };
    case 'ZONE_STORE_CLEAR_ZONE_INFO':
      return {
        ...state,
        zoneInfo: {},
      };
    case 'ZONE_STORE_CLEAR':
      return initialZoneStore;
    default:
      return state;
  }
}
