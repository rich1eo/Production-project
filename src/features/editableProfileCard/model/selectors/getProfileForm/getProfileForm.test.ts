import { StateSchema } from '@/app/providers/StoreProvider';
import { getProfileForm } from './getProfileForm';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

describe('getProfileForm', () => {
  test('should return form data', () => {
    const formData = {
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
        form: formData,
      },
    };

    expect(getProfileForm(state as StateSchema)).toEqual(formData);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileForm(state as StateSchema)).toBe(undefined);
  });
});
