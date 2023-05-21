import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTHORIZATION_HEADER } from '../constants';
import { UserContext } from '../context/UserContext';
import { UserActions } from '../enums/UserActions';
import { fetchClient } from '../http/fetchClient';
import { authService } from '../services/authService';

export function useUserContext() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  if (userContext === undefined) {
    throw new Error('User context must be used within UserContext provider');
  }

  const { userState, dispatchUserAction } = userContext;

  function logOut() {
    dispatchUserAction({ type: UserActions.LOGOUT });
    navigate('/Public/Login');
  }

  function logIn(payload: any) {
    dispatchUserAction({ type: UserActions.LOGIN, payload: payload });
  }

  async function refreshAccessToken(originalRequest: Request) {
    const client = fetchClient();
    const { refreshToken } = authService(client);
    const authUser = await refreshToken({
      successHandler: logIn,
      failureHandler: logOut,
    });
    originalRequest.headers.set(
      AUTHORIZATION_HEADER,
      `Bearer ${authUser?.token}`
    );
    return await fetch(originalRequest);
  }

  return {
    userState,
    logIn,
    logOut,
    refreshAccessToken,
  };
}
