const initialZoneStore = {};

export default function zoneStore(state = initialZoneStore, action) {
  const {
    value,
    name,
    type,
  } = action || {};
  const {
    [name]: stateName,
  } = state || {};
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
          ...stateName,
          ...value,
        },
      };
    case 'ZONE_STORE_CLEAR':
      return initialZoneStore;
    default:
      return state;
  }
}
