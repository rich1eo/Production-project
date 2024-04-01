import { FeatureFlags } from '@/shared/types/featureFlags';
import { getFeatureFlag } from './setGetFeatures';

interface ToggleFeaturesOptions<T> {
  name: keyof FeatureFlags;
  on: () => T;
  off: () => T;
}

export function toggleFeature<T>(args: ToggleFeaturesOptions<T>): T {
  const { name, off, on } = args;

  if (getFeatureFlag(name)) {
    return on();
  }

  return off();
}
