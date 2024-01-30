import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileValidateErrors } from './getProfileValidateErrors';
import { ValidationProfileError } from '../../types/editableProfileCardSchema';

describe('getProfileValidateErrors', () => {
  test('should return profile errors', () => {
    const errors = [
      ValidationProfileError.INCORRECT_USER_DATA,
      ValidationProfileError.INCORRECT_COUNTRY,
      ValidationProfileError.NO_DATA,
      ValidationProfileError.SERVER_ERROR,
    ];

    const state: DeepPartial<StateSchema> = {
      profile: {
        validateError: errors,
      },
    };

    expect(getProfileValidateErrors(state as StateSchema)).toEqual(errors);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileValidateErrors(state as StateSchema)).toBe(undefined);
  });
});
