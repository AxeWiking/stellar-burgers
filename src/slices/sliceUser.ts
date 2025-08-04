import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  TServerResponse,
  TRegisterData,
  TLoginData,
  registerUserApi,
  getUserApi,
  loginUserApi,
  resetPasswordApi,
  updateUserApi,
  getOrdersApi,
  logoutApi
} from '../utils/burger-api';
import { TUser, TOrder } from '@utils-types';
import { setCookie, deleteCookie } from '../utils/cookie';

export const performRegisterUser = createAsyncThunk(
  'auth/registerUser',
  async (regdata: TRegisterData) => registerUserApi(regdata).then(acceptAuth)
);

export const fetchUser = createAsyncThunk('auth/getUser', async () =>
  getUserApi()
);

export const performLoginUser = createAsyncThunk(
  'auth/loginUser',
  async (logindata: TLoginData) => loginUserApi(logindata).then(acceptAuth)
);

export const performUpdateUser = createAsyncThunk(
  'auth/updateUser',
  async (regdata: Partial<TRegisterData>) => updateUserApi(regdata)
);

export const fetchOrders = createAsyncThunk('auth/getOrders', async () =>
  getOrdersApi()
);

export const performLogoutUser = createAsyncThunk('auth/logoutUser', async () =>
  logoutApi().then(clearAuth)
);

export const performResetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data: { password: string; token: string }) => resetPasswordApi(data)
);

function acceptAuth(
  data: TServerResponse<{
    refreshToken: string;
    accessToken: string;
    user: TUser;
  }>
) {
  if (data.success) {
    localStorage.setItem('refreshToken', data.refreshToken);
    setCookie('accessToken', data.accessToken);
  }
  return data;
}

function clearAuth(data: TServerResponse<{}>) {
  if (data.success) {
    localStorage.removeItem('refreshToken');
    deleteCookie('accessToken');
  }
  return data;
}

export interface StateUser {
  isAuthorization: boolean;
  user: TUser | null;
  orders: TOrder[] | null;
  error: string | null;
}

export const initialStateUser: StateUser = {
  isAuthorization: true,
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
        }
      });

    builder
      .addCase(fetchUser.pending, (state) => {
        state.isAuthorization = true;
      })
      .addCase(fetchUser.rejected, (state, { error }) => {
        state.isAuthorization = false;
        state.error = error.message || 'error';
      })
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.isAuthorization = false;
        if (payload.success) {
          state.user = payload.user;
          state.error = null;
          state.orders = null;
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
        }
      });

    builder
      .addCase(performUpdateUser.pending, (state) => {
        state.isAuthorization = true;
      })
      .addCase(performUpdateUser.rejected, (state, { error }) => {
        state.isAuthorization = false;
        state.error = error.message || 'error';
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
      .addCase(performResetPassword.pending, (state) => {
        state.isAuthorization = true;
      })
      .addCase(performResetPassword.rejected, (state, { error }) => {
        state.isAuthorization = false;
        state.error = error.message || 'error';
      })
      .addCase(performResetPassword.fulfilled, (state, { payload }) => {
        state.isAuthorization = false;
        if (payload.success) {
          state.error = null;
        }
      });

    builder
      .addCase(performLogoutUser.pending, (state) => {
        state.isAuthorization = true;
      })
      .addCase(performLogoutUser.rejected, (state, { error }) => {
        state.isAuthorization = false;
        state.error = error.message || 'error';
      })
      .addCase(performLogoutUser.fulfilled, (state, { payload }) => {
        state.isAuthorization = false;
        if (payload.success) {
          state.user = null;
          state.error = null;
          state.orders = null;
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
export const reducer = sliceUser.reducer;
