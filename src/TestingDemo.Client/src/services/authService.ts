import { LoginError } from '../errors/loginError';
import { AuthUser } from '../types/AuthUser';
import { FetchClient } from '../types/FetchClient';
import { User } from '../types/User';

type LoginRequest = {
  username: string;
  password: string;
};

type ForgotPasswordRequest = {
  username: string;
};

type VerifyResetPasswordTokenRequest = {
  token: string;
};

export function authService(client: FetchClient) {
  const baseUrl = process.env.REACT_APP_API_URL;

  async function refreshAccessToken({
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

  async function logUserIn(request: LoginRequest) {
    const response = await client.post<LoginRequest>(
      `${baseUrl}/api/auth/login`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
      request
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

  async function sendForgotPasswordEmail(request: ForgotPasswordRequest) {
    await client.post<ForgotPasswordRequest>(
      `${baseUrl}/api/auth/forgot-password`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
      request
    );
  }

  async function verifyForgotPasswordToken(
    request: VerifyResetPasswordTokenRequest
  ): Promise<User> {
    const response = await client.get(
      `${baseUrl}/api/auth/verify-reset-password?token=${request.token}`
    );

    if (response.ok === false) {
      throw new Error('Invalid reset password token');
    }

    return await response.json();
  }

  return {
    logUserIn,
    refreshAccessToken,
    sendForgotPasswordEmail,
    verifyForgotPasswordToken,
  };
}
