import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  TRegisterData,
  TLoginData,
  registerUserApi,
  loginUserApi,
  updateUserApi,
  getOrdersApi,
  logoutApi
} from '@api';
import { TUser, TOrder } from '@utils-types';
import { setCookie, deleteCookie } from '../utils/cookie';

export const performRegisterUser = createAsyncThunk(
  'auth/registerUser',
  async (regdata: TRegisterData) => registerUserApi(regdata)
);

export const performLoginUser = createAsyncThunk(
  'auth/loginUser',
  async (logindata: TLoginData) => loginUserApi(logindata)
);

export const performUpdateUser = createAsyncThunk(
  'auth/updateUser',
  async (regdata: TRegisterData) => updateUserApi(regdata)
);

export const fetchOrders = createAsyncThunk('auth/getOrders', async () =>
  getOrdersApi()
);

export const performLogoutUser = createAsyncThunk('auth/logoutUser', async () =>
  logoutApi()
);

function acceptAuth(auth: { refreshToken: string; accessToken: string }) {
  localStorage.setItem('refreshToken', auth.refreshToken);
  setCookie('accessToken', auth.accessToken);
}

function clearAuth() {
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
}

export interface StateUser {
  isAuthorization: boolean;
  user: TUser | null;
  orders: TOrder[] | null;
  error: string | null;
}

const initialStateUser: StateUser = {
  isAuthorization: false,
  user: null,
  orders: null,
  error: null
};

export const sliceUser = createSlice({
  name: 'user',
  initialState: initialStateUser,
  reducers: {},
  selectors: {
    selectIsAuthorization: (state) => state.isAuthorization,
    selectIsAuthorited: (state) => state.user !== null,
    selectUser: (state) => state.user,
    selectOrders: (state) => state.orders,
    selectError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(performRegisterUser.pending, (state) => {
        state.isAuthorization = true;
      })
      .addCase(performRegisterUser.rejected, (state, { error }) => {
        state.isAuthorization = false;
        state.error = error.message || 'error';
      })
      .addCase(performRegisterUser.fulfilled, (state, { payload }) => {
        state.isAuthorization = false;
        if (payload.success) {
          state.user = payload.user;
          state.error = null;
          state.orders = null;
          acceptAuth(payload);
        }
      });

    builder
      .addCase(performLoginUser.pending, (state) => {
        state.isAuthorization = true;
      })
      .addCase(performLoginUser.rejected, (state, { error }) => {
        state.isAuthorization = false;
        state.error = error.message || 'error';
      })
      .addCase(performLoginUser.fulfilled, (state, { payload }) => {
        state.isAuthorization = false;
        if (payload.success) {
          state.user = payload.user;
          state.error = null;
          state.orders = null;
          acceptAuth(payload);
        }
      });

    builder
      .addCase(performUpdateUser.pending, (state) => {
        state.isAuthorization = true;
      })
      .addCase(performUpdateUser.rejected, (state, { error }) => {
        state.isAuthorization = false;
      })
      .addCase(performUpdateUser.fulfilled, (state, { payload }) => {
        state.isAuthorization = false;
        if (payload.success) {
          state.user = payload.user;
          state.error = null;
        }
      });

    builder
      .addCase(fetchOrders.pending, (state) => {})
      .addCase(fetchOrders.rejected, (state, { error }) => {})
      .addCase(fetchOrders.fulfilled, (state, { payload }) => {
        state.orders = payload;
      });

    builder
      .addCase(performLogoutUser.pending, (state) => {
        state.isAuthorization = true;
      })
      .addCase(performLogoutUser.rejected, (state, { error }) => {
        state.isAuthorization = false;
      })
      .addCase(performLogoutUser.fulfilled, (state, { payload }) => {
        state.isAuthorization = false;
        if (payload.success) {
          state.user = null;
          state.error = null;
          state.orders = null;
          clearAuth();
        }
      });
  }
});

export const {
  selectIsAuthorization,
  selectIsAuthorited,
  selectUser,
  selectOrders,
  selectError
} = sliceUser.selectors;
