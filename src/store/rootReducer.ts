import { combineReducers } from '@reduxjs/toolkit';

import { authSlice } from '@store/auth';
import { coreSlice } from '@store/core';

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  core: coreSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
