const initialZoneStore = {};

export default function zoneStore(state = initialZoneStore, action) {
  const {
    zoneInfo,
    zoneInfoToEdit,
  } = state || {};
  const {
    value,
    name,
    type,
  } = action || {};
  switch (type) {
    case 'ZONE_STORE_SET_SECTION':
      return {
        ...state,
        ...value,
      };
    case 'ZONE_STORE_SET_SUB_SECTION':
      return {
        ...state,
        [name]: {
          ...state[name],
          ...value,
        },
      };
    case 'ZONE_STORE_SET_ZONE_INFO_TO_EDIT_SECTION':
      return {
        ...state,
        zoneInfoToEdit: {
          ...zoneInfoToEdit,
          ...value,
        },
      };
    case 'ZONE_STORE_SET_ZONE_INFO_SECTION':
      return {
        ...state,
        zoneInfo: {
          ...zoneInfo,
          ...value,
        },
      };
    case 'ZONE_STORE_CLEAR_ZONE_INFO':
      return {
        ...state,
        zoneInfo: undefined,
      };
    case 'ZONE_STORE_CLEAR':
      return initialZoneStore;
    default:
      return state;
  }
}
