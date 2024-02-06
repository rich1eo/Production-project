import { Profile } from 'entities/Profile';
import { ValidationProfileError } from '../../consts/consts';

export const validateProfileData = (profile?: Profile) => {
  if (!profile) {
    return [ValidationProfileError.NO_DATA];
  }

  const { firstName, secondName, country, age } = profile;
  const errors: ValidationProfileError[] = [];

  if (!firstName || !secondName) {
    errors.push(ValidationProfileError.INCORRECT_USER_DATA);
  }

  if (!age || !Number.isInteger(age)) {
    errors.push(ValidationProfileError.INCORRECT_AGE);
  }

  if (!country) {
    errors.push(ValidationProfileError.INCORRECT_COUNTRY);
  }

  return errors;
};
