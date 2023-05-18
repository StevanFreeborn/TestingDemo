import { ReactNode, createContext, useContext, useReducer } from 'react';

const USER_KEY = 'testingDemoAuth';

enum UserActions {
  LOGIN,
  LOGOUT,
}

type UserAction = {
  type: UserActions;
  payload: object;
};

type UserContextType = {
  state: AuthUser | null;
  dispatch: React.Dispatch<UserAction>;
};

type User = {
  id: string;
  username: string;
  email: string;
};

type AuthUser = {
  expiration: Date;
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
    default:
      return null;
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
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}
