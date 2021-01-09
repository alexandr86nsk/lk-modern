import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@store/rootReducer';

export type authState = {
  login?: string;
  password?: string;
  token?: string;
  errors?: string;
  tryAuthIndicator?: boolean;
};

export type GetAuthActionType = {
  login: string;
  password: string;
};

export const initialState: authState = {};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getAuth: (state, _action: PayloadAction<GetAuthActionType>) => {
      return {
        ...state,
        tryAuthIndicator: true,
      };
    },
    getAuthCancel: (state) => {
      return {
        ...state,
        tryAuthIndicator: false,
      };
    },
    setToken: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        token: action.payload,
      };
    },
    setErrors: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        errors: action.payload,
      };
    },
    clear: () => {
      return initialState;
    },
  },
  extraReducers: {
    // [coreActions.signOut.type]: (_state, _action) => initialState,
  },
});

export const authActions = { ...authSlice.actions };

export const authSelectors = {
  token: (state: RootState) => state.auth.token,
  login: (state: RootState) => state.auth.login,
  password: (state: RootState) => state.auth.password,
  tryAuthIndicator: (state: RootState) => state.auth.tryAuthIndicator,
  errors: (state: RootState) => state.auth.errors,
};
