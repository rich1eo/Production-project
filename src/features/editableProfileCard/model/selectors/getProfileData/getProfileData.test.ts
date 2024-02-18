import { StateSchema } from '@/app/providers/StoreProvider';
import { getProfileData } from './getProfileData';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

describe('getProfileData', () => {
  test('should return profile data', () => {
    const profileData = {
      age: 23,
      firstName: 'Test',
      secondName: 'User',
      country: Country.Ukraine,
      username: 'admin',
      currency: Currency.EUR,
      city: 'Kiev',
    };

    const state: DeepPartial<StateSchema> = {
      profile: {
        data: profileData,
      },
    };

    expect(getProfileData(state as StateSchema)).toEqual(profileData);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileData(state as StateSchema)).toBe(undefined);
  });
});
