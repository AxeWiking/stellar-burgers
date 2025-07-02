import { expect, test } from '@jest/globals';
import {
  initialStateUser,
  reducer,
  performRegisterUser,
  fetchUser,
  performLoginUser,
  performUpdateUser,
  fetchOrders,
  performResetPassword,
  performLogoutUser
} from './sliceUser';
import * as constant from '../constants/constants';

describe('тестируем редьюсер персональных данных', () => {
  test('запрос регистрации пользователя', () => {
    const state = reducer(
      initialStateUser,
      performRegisterUser.pending('', {
        ...constant.mockPirateUser,
        password: 'xxx'
      })
    );
    expect(state.isAuthorization).toBe(true);
    expect(state.user).toBeNull();
    expect(state.orders).toBeNull();
    expect(state.error).toBeNull();
  });

  test('неудачный запрос регистрации пользователя', () => {
    const groundsRefusal = 'only for Spanish infantrymen';
    const state = reducer(
      {
        ...initialStateUser,
        isAuthorization: true
      },
      performRegisterUser.rejected(new Error(groundsRefusal), '', {
        ...constant.mockPirateUser,
        password: 'xxx'
      })
    );
    expect(state.isAuthorization).toBe(false);
    expect(state.user).toBeNull();
    expect(state.orders).toBeNull();
    expect(state.error).toEqual(groundsRefusal);
  });

  test('удачный запрос регистрации пользователя', () => {
    const state = reducer(
      {
        ...initialStateUser,
        isAuthorization: true
      },
      performRegisterUser.fulfilled(
        {
          success: true,
          refreshToken: 'none',
          accessToken: 'none',
          user: constant.mockPirateUser
        },
        '',
        { ...constant.mockPirateUser, password: 'xxx' }
      )
    );
    expect(state.isAuthorization).toBe(false);
    expect(state.user).toEqual(constant.mockPirateUser);
    expect(state.orders).toBeNull();
    expect(state.error).toBeNull();
  });

  test('запрос данных пользователя', () => {
    const state = reducer(initialStateUser, fetchUser.pending(''));
    expect(state.isAuthorization).toBe(true);
    expect(state.user).toBeNull();
    expect(state.orders).toBeNull();
    expect(state.error).toBeNull();
  });

  test('неудачный запрос данных пользователя', () => {
    const groundsRefusal = 'only for English sailors';
    const state = reducer(
      {
        ...initialStateUser,
        isAuthorization: true
      },
      fetchUser.rejected(new Error(groundsRefusal), '')
    );
    expect(state.isAuthorization).toBe(false);
    expect(state.user).toBeNull();
    expect(state.orders).toBeNull();
    expect(state.error).toEqual(groundsRefusal);
  });

  test('удачный запрос данных пользователя', () => {
    const state = reducer(
      {
        ...initialStateUser,
        isAuthorization: true
      },
      fetchUser.fulfilled(
        {
          success: true,
          user: constant.mockPirateUser
        },
        ''
      )
    );
    expect(state.isAuthorization).toBe(false);
    expect(state.user).toEqual(constant.mockPirateUser);
    expect(state.orders).toBeNull();
    expect(state.error).toBeNull();
  });

  test('запрос логина пользователя', () => {
    const state = reducer(
      initialStateUser,
      performLoginUser.pending('', {
        ...constant.mockPirateUser,
        password: 'xxx'
      })
    );
    expect(state.isAuthorization).toBe(true);
    expect(state.user).toBeNull();
    expect(state.orders).toBeNull();
    expect(state.error).toBeNull();
  });

  test('неудачный запрос логина пользователя', () => {
    const groundsRefusal = 'only for Chinese merchants';
    const state = reducer(
      {
        ...initialStateUser,
        isAuthorization: true
      },
      performLoginUser.rejected(new Error(groundsRefusal), '', {
        ...constant.mockPirateUser,
        password: 'xxx'
      })
    );
    expect(state.isAuthorization).toBe(false);
    expect(state.user).toBeNull();
    expect(state.orders).toBeNull();
    expect(state.error).toEqual(groundsRefusal);
  });

  test('удачный запрос логина пользователя', () => {
    const state = reducer(
      {
        ...initialStateUser,
        isAuthorization: true
      },
      performLoginUser.fulfilled(
        {
          success: true,
          refreshToken: 'none',
          accessToken: 'none',
          user: constant.mockPirateUser
        },
        '',
        { ...constant.mockPirateUser, password: 'xxx' }
      )
    );
    expect(state.isAuthorization).toBe(false);
    expect(state.user).toEqual(constant.mockPirateUser);
    expect(state.orders).toBeNull();
    expect(state.error).toBeNull();
  });

  test('запрос обновления данных пользователя', () => {
    const state = reducer(
      {
        isAuthorization: false,
        user: constant.mockPirateUser,
        orders: constant.solidOrders,
        error: null
      },
      performUpdateUser.pending('', constant.mockAdvancedPirateUser)
    );
    expect(state.isAuthorization).toBe(true);
    expect(state.user).toBe(constant.mockPirateUser);
    expect(state.orders).toBe(constant.solidOrders);
    expect(state.error).toBeNull();
  });

  test('неудачный запрос обновления данных пользователя', () => {
    const groundsRefusal = 'only for polar bears';
    const state = reducer(
      {
        isAuthorization: true,
        user: constant.mockPirateUser,
        orders: constant.solidOrders,
        error: null
      },
      performUpdateUser.rejected(
        new Error(groundsRefusal),
        '',
        constant.mockAdvancedPirateUser
      )
    );
    expect(state.isAuthorization).toBe(false);
    expect(state.user).toBe(constant.mockPirateUser);
    expect(state.orders).toBe(constant.solidOrders);
    expect(state.error).toEqual(groundsRefusal);
  });

  test('удачный запрос обновления данных пользователя', () => {
    const state = reducer(
      {
        isAuthorization: true,
        user: constant.mockPirateUser,
        orders: constant.solidOrders,
        error: null
      },
      performUpdateUser.fulfilled(
        {
          success: true,
          user: constant.mockAdvancedPirateUser
        },
        '',
        constant.mockAdvancedPirateUser
      )
    );
    expect(state.isAuthorization).toBe(false);
    expect(state.user).toEqual(constant.mockAdvancedPirateUser);
    expect(state.orders).toBe(constant.solidOrders);
    expect(state.error).toBeNull();
  });

  const mockStateUser = {
    isAuthorization: false,
    user: constant.mockPirateUser,
    orders: [constant.mockOrderOne],
    error: null
  };

  test('запрос заказов сделанных пользователем', () => {
    const state = reducer(mockStateUser, fetchOrders.pending(''));
    expect(state).toEqual(mockStateUser);
  });

  test('неудачный запрос заказов сделанных пользователем', () => {
    const groundsRefusal = 'only for fun programmers';
    const state = reducer(
      mockStateUser,
      fetchOrders.rejected(new Error(groundsRefusal), '')
    );
    expect(state).toEqual(mockStateUser);
  });

  test('удачный запрос заказов сделанных пользователем', () => {
    const state = reducer(
      mockStateUser,
      fetchOrders.fulfilled(constant.solidOrders, '')
    );
    expect(state).toEqual({ ...mockStateUser, orders: constant.solidOrders });
  });

  test('запрос смены пароля пользователя', () => {
    const state = reducer(
      {
        isAuthorization: false,
        user: constant.mockPirateUser,
        orders: constant.solidOrders,
        error: null
      },
      performResetPassword.pending('', { password: 'yyy', token: 'none' })
    );
    expect(state.isAuthorization).toBe(true);
    expect(state.user).toBe(constant.mockPirateUser);
    expect(state.orders).toBe(constant.solidOrders);
    expect(state.error).toBeNull();
  });

  test('неудачный запрос смены пароля пользователя', () => {
    const groundsRefusal = 'only for penguins';
    const state = reducer(
      {
        isAuthorization: true,
        user: constant.mockPirateUser,
        orders: constant.solidOrders,
        error: null
      },
      performResetPassword.rejected(new Error(groundsRefusal), '', {
        password: 'yyy',
        token: 'none'
      })
    );
    expect(state.isAuthorization).toBe(false);
    expect(state.user).toBe(constant.mockPirateUser);
    expect(state.orders).toBe(constant.solidOrders);
    expect(state.error).toEqual(groundsRefusal);
  });

  test('удачный запрос смены пароля пользователя', () => {
    const state = reducer(
      {
        isAuthorization: true,
        user: constant.mockPirateUser,
        orders: constant.solidOrders,
        error: null
      },
      performResetPassword.fulfilled(
        {
          success: true
        },
        '',
        { password: 'yyy', token: 'none' }
      )
    );
    expect(state.isAuthorization).toBe(false);
    expect(state.user).toEqual(constant.mockPirateUser);
    expect(state.orders).toBe(constant.solidOrders);
    expect(state.error).toBeNull();
  });

  test('запрос выхода пользователя', () => {
    const state = reducer(
      {
        isAuthorization: false,
        user: constant.mockPirateUser,
        orders: constant.solidOrders,
        error: null
      },
      performLogoutUser.pending('')
    );
    expect(state.isAuthorization).toBe(true);
    expect(state.user).toBe(constant.mockPirateUser);
    expect(state.orders).toBe(constant.solidOrders);
    expect(state.error).toBeNull();
  });

  test('неудачный запрос выхода пользователя', () => {
    const groundsRefusal = 'impossible';
    const state = reducer(
      {
        isAuthorization: true,
        user: constant.mockPirateUser,
        orders: constant.solidOrders,
        error: null
      },
      performLogoutUser.rejected(new Error(groundsRefusal), '')
    );
    expect(state.isAuthorization).toBe(false);
    expect(state.user).toBe(constant.mockPirateUser);
    expect(state.orders).toBe(constant.solidOrders);
    expect(state.error).toEqual(groundsRefusal);
  });

  test('удачный запрос выхода пользователя', () => {
    const state = reducer(
      {
        isAuthorization: true,
        user: constant.mockPirateUser,
        orders: constant.solidOrders,
        error: null
      },
      performLogoutUser.fulfilled(
        {
          success: true
        },
        ''
      )
    );
    expect(state.isAuthorization).toBe(false);
    expect(state.user).toBeNull();
    expect(state.orders).toBeNull();
    expect(state.error).toBeNull();
  });
});
