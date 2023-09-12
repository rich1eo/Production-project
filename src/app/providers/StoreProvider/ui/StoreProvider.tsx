import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from '../config/store';
import { StateSchema } from '../config/StateSchema';
import { DeepPartial } from '@reduxjs/toolkit';

export interface StoreProvider {
  children: ReactNode;
  initialState?: DeepPartial<StateSchema>;
}

export default function StoreProvider({
  children,
  initialState,
}: StoreProvider) {
  const store = createReduxStore(initialState as StateSchema);

  return <Provider store={store}>{children}</Provider>;
}
