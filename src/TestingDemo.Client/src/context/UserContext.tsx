import { ReactNode, createContext, useContext, useReducer } from 'react';

const USER_KEY = 'testingDemoAuth';

export enum UserActions {
  LOGIN,
  LOGOUT,
}

type UserAction = {
  type: UserActions;
  payload?: object;
};

type UserContextType = {
  userState: AuthUser | null;
  dispatchUserAction: React.Dispatch<UserAction>;
};

type User = {
  id: string;
  username: string;
  email: string;
};

type AuthUser = {
  expiration: string;
  expiresIn: number;
  token: string;
  user: User;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

function userReducer(
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

function createInitialState(): AuthUser | null {
  const storedUser = localStorage.getItem(USER_KEY);

  if (storedUser === null) {
    return null;
  }

  return JSON.parse(storedUser);
}

export function useUserContext() {
  const userContext = useContext(UserContext);

  if (userContext === undefined) {
    throw new Error('User context is not defined');
  }

  return userContext;
}

export function UserContextProvider({ children }: { children: ReactNode }) {
  const initialState = createInitialState();
  const [userState, dispatchUserAction] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ userState, dispatchUserAction }}>
      {children}
    </UserContext.Provider>
  );
}
