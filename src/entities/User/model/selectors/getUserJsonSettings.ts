import { buildSelector } from '@/shared/lib/store';
import { JsonSettings } from '../types/jsonSettings';

const defaultJsonSettings: JsonSettings = {};

export const [useUserJsonSettings, getUserJsonSettings] = buildSelector(
  (store) => store.user.authData?.jsonSettings ?? defaultJsonSettings,
);

export const [useUserJsonSettingsByKey, getUserJsonSettingsByKey] =
  buildSelector(
    (store, key: keyof JsonSettings) =>
      store.user.authData?.jsonSettings?.[key],
  );
