const initialCalendarStore = {};

export default function calendarStore(state = initialCalendarStore, action) {
  const {
    value,
    name,
    type,
  } = action || {};
  const {
    [name]: stateName,
  } = state || {};
  switch (type) {
    case 'CALENDAR_STORE_SET_SECTION':
      return {
        ...state,
        ...value,
      };
    case 'CALENDAR_STORE_SET_SUB_SECTION':
      return {
        ...state,
        [name]: {
          ...stateName,
          ...value,
        },
      };
    case 'CALENDAR_STORE_CLEAR':
      return initialCalendarStore;
    default:
      return state;
  }
}
