import { LoginError } from '../errors/loginError';
import { AuthUser } from '../types/AuthUser';
import { FetchClient } from '../types/FetchClient';

type LoginRequest = {
  username: string;
  password: string;
};

export function authService(client: FetchClient) {
  const baseUrl = process.env.REACT_APP_API_URL;

  async function refreshToken({
    successHandler,
    failureHandler,
  }: {
    successHandler: (payload: any) => void;
    failureHandler: () => void;
  }): Promise<AuthUser | undefined> {
    const response = await client.post(`${baseUrl}/api/auth/refresh-token`);

    if (response.ok === false) {
      failureHandler();
      return;
    }

    const payload = await response.json();
    successHandler(payload);
    return payload;
  }

  async function logUserIn(loginRequest: LoginRequest) {
    const response = await client.post<LoginRequest>(
      `${baseUrl}/api/auth/login`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
      loginRequest
    );

    const data = await response.json();

    if (response.status === 400) {
      throw new LoginError('Username/Password combination is not valid', data);
    }

    if (response.ok === false) {
      throw new LoginError('Unable to log in', data);
    }

    return data;
  }

  return {
    logUserIn,
    refreshToken,
  };
}
