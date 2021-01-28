import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@store/rootReducer';

export type AuthState = {
  login?: string;
  password?: string;
  token?: string;
  errors?: string;
  tryAuthIndicator?: boolean;
  registerLogin?: string;
  registerPassword?: string;
  registerPasswordConfirm?: string;
  registerErrors?: string;
  tryRegisterIndicator?: boolean;
};

export type GetAuthAction = {
  login: string;
  password: string;
};

export type GetRegisterAction = GetAuthAction;

export type SetAuthSectionAction = Partial<AuthState>;

export const initialState: AuthState = {};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSection: (state, action: PayloadAction<SetAuthSectionAction>) => {
      return {
        ...state,
        errors: undefined,
        ...action.payload,
      };
    },
    getAuth: (state, _action: PayloadAction<GetAuthAction>) => {
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
    getRegister: (state, _action: PayloadAction<GetRegisterAction>) => {
      return {
        ...state,
        tryRegisterIndicator: true,
      };
    },
    getRegisterCancel: (state) => {
      return {
        ...state,
        tryRegisterIndicator: false,
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
    setRegisterErrors: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        registerErrors: action.payload,
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
  registerLogin: (state: RootState) => state.auth.registerLogin,
  registerPassword: (state: RootState) => state.auth.registerPassword,
  registerPasswordConfirm: (state: RootState) => state.auth.registerPasswordConfirm,
  tryRegisterIndicator: (state: RootState) => state.auth.tryRegisterIndicator,
  registerErrors: (state: RootState) => state.auth.registerErrors,
};
