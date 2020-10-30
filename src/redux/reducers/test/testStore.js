const initialTestStore = {};

export default function testStore(state = initialTestStore, action) {
  switch (action.type) {
    case 'TEST_STORE_SET_SECTION':
      return {
        ...state,
        ...action.value,
      };
    case 'TEST_STORE_CLEAR':
      return initialTestStore;
    default:
      return state;
  }
}
