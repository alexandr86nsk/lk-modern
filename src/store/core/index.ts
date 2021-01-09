import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '@store/rootReducer';

export type coreState = {
  showSidebar?: boolean;
};

export const initialState: coreState = {};

export const coreSlice = createSlice({
  name: 'core',
  initialState,
  reducers: {
    changeShowSidebarState: (state) => {
      const status = state.showSidebar;
      return {
        ...state,
        showSidebar: !status,
      };
    },
    clear: () => {
      return initialState;
    },
  },
  extraReducers: {},
});

export const coreActions = { ...coreSlice.actions };

export const coreSelectors = {
  showSidebar: (state: RootState) => state.core.showSidebar,
};
