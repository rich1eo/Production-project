import { LOCAL_STORAGE_DESIGN_KEY } from '@/shared/const/localstorage';
import { FeatureFlags } from '../../../types/featureFlags';

const defaultFeatures: FeatureFlags = {
  isAppRedesigned: localStorage.getItem(LOCAL_STORAGE_DESIGN_KEY) === 'new',
};

let featureFlags: FeatureFlags = {
  ...defaultFeatures,
};

export function setFeatureFlags(newFeatureFlags?: FeatureFlags) {
  if (newFeatureFlags) {
    featureFlags = newFeatureFlags;
  }
}

export function getFeatureFlag(flag: keyof FeatureFlags) {
  return featureFlags?.[flag] ?? true;
}

export function getAllFeatureFlags() {
  return featureFlags;
}
