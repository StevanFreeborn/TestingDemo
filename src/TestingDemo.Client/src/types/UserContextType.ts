import { AuthUser } from './AuthUser';
import { UserAction } from './UserAction';

export type UserContextType = {
  userState: AuthUser | null;
  dispatchUserAction: React.Dispatch<UserAction>;
};
