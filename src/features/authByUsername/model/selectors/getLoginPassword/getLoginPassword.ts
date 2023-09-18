import { StateSchema } from 'app/providers/StoreProvider';

export const getLoginPassword = (state: StateSchema) => {
  return state.loginFrom?.password || '';
};
