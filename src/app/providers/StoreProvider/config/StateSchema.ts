import { UserSchema } from 'entities/User';
import { LoginShema } from 'features/authByUsername';

export interface StateSchema {
  user: UserSchema;
  loginFrom?: LoginShema;
}
