import { createReduxStore } from './config/store';
import { AppDispatch } from './config/StateSchema';
import StoreProvider from './ui/StoreProvider';
import type {
  StateSchema,
  ReduxStoreWithManager,
  ThunkExtraArg,
  ThunkConfig,
  StateSchemaKey,
} from './config/StateSchema';

export {
  StoreProvider,
  createReduxStore,
  StateSchema,
  ReduxStoreWithManager,
  ThunkExtraArg,
  ThunkConfig,
  StateSchemaKey,
};

export type { AppDispatch };
