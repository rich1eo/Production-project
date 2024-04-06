import { ReactNode } from 'react';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { getFeatureFlag } from '../setGetFeatures';

interface ToggleFeatureProps {
  name: keyof FeatureFlags;
  on: ReactNode;
  off: ReactNode;
}

export const ToggleFeature = (props: ToggleFeatureProps) => {
  const { name, on, off } = props;

  if (getFeatureFlag(name)) {
    return on;
  }

  return off;
};
