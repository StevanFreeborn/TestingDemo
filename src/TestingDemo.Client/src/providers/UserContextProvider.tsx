import { ReactNode, useReducer } from 'react';
import { USER_KEY } from '../constants';
import { UserContext } from '../context/UserContext';
import { UserActions } from '../enums/UserActions';
import { AuthUser } from '../types/AuthUser';
import { UserAction } from '../types/UserAction';
import { UserReducer } from '../types/UserReducer';

export function userReducer(
  state: AuthUser | null,
  action: UserAction
): AuthUser | null {
  switch (action.type) {
    case UserActions.LOGIN:
      localStorage.setItem(USER_KEY, JSON.stringify(action.payload));
      return action.payload as AuthUser;
    case UserActions.LOGOUT:
      localStorage.removeItem(USER_KEY);
      return null;
    default:
      return state;
  }
}

export function createInitialState(): AuthUser | null {
  const storedUser = localStorage.getItem(USER_KEY);

  if (storedUser === null) {
    return null;
  }

  return JSON.parse(storedUser);
}

export function UserContextProvider({
  initialUserState = createInitialState(),
  userStateReducer = userReducer,
  children,
}: {
  initialUserState?: AuthUser | null;
  userStateReducer?: UserReducer;
  children: ReactNode;
}) {
  const [userState, dispatchUserAction] = useReducer(
    userStateReducer,
    initialUserState
  );

  return (
    <UserContext.Provider value={{ userState, dispatchUserAction }}>
      {children}
    </UserContext.Provider>
  );
}
