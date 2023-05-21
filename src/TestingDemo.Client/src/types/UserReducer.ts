import { AuthUser } from './AuthUser';
import { UserAction } from './UserAction';

export type UserReducer = (
  state: AuthUser | null,
  action: UserAction
) => AuthUser | null;
