import { Profile } from 'entities/Profile';

export enum ValidationProfileError {
  INCORRECT_USER_DATA = 'Incorrect user data',
  INCORRECT_AGE = 'Incorrect age',
  INCORRECT_COUNTRY = 'Incorrect country',
  NO_DATA = 'No data',
  SERVER_ERROR = 'Server error',
}

export interface ProfileSchema {
  data?: Profile;
  form?: Profile;
  isLoading: boolean;
  error?: string;
  readonly: boolean;
  validateError?: ValidationProfileError[];
}
