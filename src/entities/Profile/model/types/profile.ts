import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

export interface Profile {
  firstName?: string;
  secondName?: string;
  age?: number;
  currency?: Currency;
  country?: Country;
  city?: string;
  username?: string;
  avatar?: string;
}

export interface ProfileShema {
  data?: Profile;
  form?: Profile;
  isLoading: boolean;
  error?: string;
  readonly: boolean;
}
