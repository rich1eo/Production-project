import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchProfileData } from './fetchProfileData';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

const profileData = {
  age: 23,
  firstName: 'Test',
  secondName: 'User',
  country: Country.Ukraine,
  username: 'admin',
  currency: Currency.EUR,
  city: 'Kiev',
};

describe('fetchProfileData', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);
    thunk.api.get.mockReturnValue(Promise.resolve({ data: profileData }));
    const result = await thunk.callThunk('1');

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(profileData);
  });

  test('rejected login', async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk('1');

    expect(result.meta.requestStatus).toBe('rejected');
  });
});
