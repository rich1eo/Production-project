import { useDispatch, useStore } from 'react-redux';
import { Reducer } from '@reduxjs/toolkit';
import { ReactNode, useEffect } from 'react';

import {
  ReduxStoreWithManager,
  StateSchema,
  StateSchemaKey,
} from '@/app/providers/StoreProvider';

export type ReducerList = {
  [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>;
};

interface DynamicModuleLoaderProps {
  children: ReactNode;
  removeAfterUnmount?: boolean;
  reducers: ReducerList;
}

export default function DynamicModuleLoader(props: DynamicModuleLoaderProps) {
  const { children, removeAfterUnmount = true, reducers } = props;

  const dispatch = useDispatch();
  const store = useStore() as ReduxStoreWithManager;

  useEffect(() => {
    const mountedReducers = store.reducerManager.getMountedReducers();
    Object.entries(reducers).forEach(([reducerName, reducer]) => {
      const mounted = mountedReducers[reducerName as StateSchemaKey];
      if (!mounted) {
        store.reducerManager.add(reducerName as StateSchemaKey, reducer);
        dispatch({ type: `@Init ${reducerName} reducer` });
      }
    });

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([reducerName]) => {
          store.reducerManager.remove(reducerName as StateSchemaKey);
          dispatch({ type: `@Destroy ${reducerName} reducer` });
        });
      }
    };
  }, []);

  return <>{children}</>;
}
