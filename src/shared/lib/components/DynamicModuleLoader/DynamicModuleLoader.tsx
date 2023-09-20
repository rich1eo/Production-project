import { useDispatch, useStore } from 'react-redux';
import { Reducer } from '@reduxjs/toolkit';
import { ReactNode, useEffect } from 'react';

import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import { StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema';

export type ReducerList = {
  [name in StateSchemaKey]?: Reducer;
};

type ReducerListEntry = [StateSchemaKey, Reducer];

interface DynamicModuleLoaderProps {
  children: ReactNode;
  removeAfterUnmount?: boolean;
  reducers: ReducerList;
}

export default function DynamicModuleLoader(props: DynamicModuleLoaderProps) {
  const dispath = useDispatch();
  const { children, removeAfterUnmount, reducers } = props;

  const store = useStore() as ReduxStoreWithManager;

  useEffect(() => {
    Object.entries(reducers).forEach(
      ([reducerName, reducer]: ReducerListEntry) => {
        store.reducerManager.add(reducerName, reducer);
        dispath({ type: `@Init ${reducerName} reducer` });
      }
    );

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([reducerName]: ReducerListEntry) => {
          store.reducerManager.remove(reducerName);
          dispath({ type: `@Destroy ${reducerName} reducer` });
        });
      }
    };
  }, []);

  return <>{children}</>;
}
