import { ReactNode, createContext, useContext, useReducer } from 'react';

enum UserActions {
  LOGIN,
  LOGOUT,
}

type UserAction = {
  type: UserActions;
  payload: object;
};

type UserContextType = {
  state: string;
  dispatch: React.Dispatch<UserAction>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

function userReducer() {
  switch (true) {
    default:
      return 'hello';
  }
}

export function useUserContext() {
  return useContext(UserContext);
}

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(userReducer, '');

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}
