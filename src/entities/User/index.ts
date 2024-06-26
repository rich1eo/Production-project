export { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';

export {
  useUserInited,
  getUserInited,
} from './model/selectors/getUserInited/getUserInited';

export {
  userActions,
  userReducer,
  useUserActions,
} from './model/slice/userSlice';

export { UserRole } from './model/consts/consts';

export {
  getUserRoles,
  isUserAdmin,
  isUserManager,
} from './model/selectors/roleSelectors';

export type { User, UserSchema } from './model/types/user';

export {
  useUserJsonSettings,
  useUserJsonSettingsByKey,
  getUserJsonSettings,
  getUserJsonSettingsByKey,
} from './model/selectors/getUserJsonSettings';

export { saveJsonSettings } from './model/services/saveJsonSettings';
export { initAuthData } from './model/services/initAuthData';
