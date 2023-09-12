import { StateSchema } from 'app/providers/StoreProvider';
import { getCounterValue } from './getCounterValue';
import { DeepPartial } from '@reduxjs/toolkit';

describe('getCounterValue', () => {
  test('should return state', () => {
    const state: DeepPartial<StateSchema> = {
      counter: {
        value: 10,
      },
    };

    expect(getCounterValue(state as StateSchema)).toBe(10);
  });
});
