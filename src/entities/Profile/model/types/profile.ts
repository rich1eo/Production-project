import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

export enum ValidationProfileError {
  INCORRECT_USER_DATA = 'Incorrect user data',
  INCORRECT_AGE = 'Incorrect age',
  INCORRECT_COUNTRY = 'Incorrect country',
  NO_DATA = 'No data',
  SERVER_ERROR = 'Server error',
}

export interface Profile {
  id?: string;
  firstName?: string;
  secondName?: string;
  age?: number;
  currency?: Currency;
  country?: Country;
  city?: string;
  username?: string;
  avatar?: string;
}

export interface ProfileSchema {
  data?: Profile;
  form?: Profile;
  isLoading: boolean;
  error?: string;
  readonly: boolean;
  validateError?: ValidationProfileError[];
}
