import { Country } from '@/entities/Country';
import { validateProfileData } from './validateProfileData';
import { Currency } from '@/entities/Currency';
import { ValidationProfileError } from '../../consts/consts';

const profileData = {
  age: 23,
  firstName: 'Test',
  secondName: 'User',
  country: Country.Ukraine,
  username: 'admin',
  currency: Currency.EUR,
  city: 'Kiev',
};

describe('validateProfileData', () => {
  test('success', () => {
    const res = validateProfileData(profileData);
    expect(res).toEqual([]);
  });

  test('firsName and secondName empty', () => {
    const res = validateProfileData({
      ...profileData,
      firstName: '',
      secondName: '',
    });
    expect(res).toEqual([ValidationProfileError.INCORRECT_USER_DATA]);
  });

  test('float age error', () => {
    const res = validateProfileData({
      ...profileData,
      age: 22.3,
    });
    expect(res).toEqual([ValidationProfileError.INCORRECT_AGE]);
  });

  test('empty country', () => {
    const res = validateProfileData({
      ...profileData,
      country: undefined,
    });
    expect(res).toEqual([ValidationProfileError.INCORRECT_COUNTRY]);
  });

  test('incorrect all', () => {
    const res = validateProfileData({});
    expect(res).toEqual([
      ValidationProfileError.INCORRECT_USER_DATA,
      ValidationProfileError.INCORRECT_AGE,
      ValidationProfileError.INCORRECT_COUNTRY,
    ]);
  });

  test('no profile', () => {
    const res = validateProfileData();
    expect(res).toEqual([ValidationProfileError.NO_DATA]);
  });
});
