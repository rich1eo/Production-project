import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';

export const [useUserInited, getUserInited] = buildSelector(
  (state: StateSchema) => {
    return state.user._inited;
  }
);
