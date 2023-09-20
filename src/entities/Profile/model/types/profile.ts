import { Country, Currency } from 'shared/const/common';

export interface Profile {
  firstName: string;
  secondName: string;
  age: number;
  currency: Currency;
  country: Country;
  city: string;
  username: string;
  avatar: string;
}

export interface ProfileShema {
  data?: Profile;
  isLoading: boolean;
  error?: string;
  readonly: boolean;
}