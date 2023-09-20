import { DeepPartial } from '@reduxjs/toolkit';
import { LoginShema } from '../types/loginShema';
import { loginActions, loginReducer } from './loginSlice';

describe('loginSlice', () => {
  test('should set username', () => {
    const state: DeepPartial<LoginShema> = { username: '123' };

    expect(
      loginReducer(state as LoginShema, loginActions.setUsername('123123'))
    ).toEqual({ username: '123123' });
  });

  test('should set password', () => {
    const state: DeepPartial<LoginShema> = { password: '123' };

    expect(
      loginReducer(state as LoginShema, loginActions.setPassword('123123'))
    ).toEqual({ password: '123123' });
  });
});
