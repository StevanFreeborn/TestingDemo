import { UserActions, useUserContext } from '../context/UserContext';
import { LoginError } from '../errors/loginError';
import { useClient } from './httpClient';

type LoginRequest = {
  username: string;
  password: string;
};

export function useAuthService() {
  const baseUrl = process.env.REACT_APP_API_URL;
  const { dispatch } = useUserContext();
  const client = useClient();

  async function refreshToken() {
    const response = await client.get(`${baseUrl}/api/auth/refresh-token`);

    if (response.ok === false) {
      dispatch({ type: UserActions.LOGOUT });
      return;
    }

    const payload = await response.json();

    dispatch({ type: UserActions.LOGIN, payload });
  }

  async function logUserIn(loginRequest: LoginRequest) {
    const response = await client.post<LoginRequest>(
      `${baseUrl}/api/auth/login`,
      loginRequest,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();

    if (response.ok === false) {
      throw new LoginError('Unable to log user in', {
        request: loginRequest,
        response: data,
      });
    }

    return data;
  }

  return {
    logUserIn,
    refreshToken,
  };
}
