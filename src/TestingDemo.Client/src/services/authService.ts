import { LoginError } from '../errors/loginError';
import { ResetPasswordError } from '../errors/resetPasswordError';
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

type ResetPasswordRequest = {
  token: string | null;
  password: string;
  confirmPassword: string;
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

    const data = await response.json();

    if (response.ok === false) {
      throw new ResetPasswordError('Invalid reset password token', data);
    }

    return data;
  }

  async function resetUserPassword(request: ResetPasswordRequest) {
    const response = await client.post<ResetPasswordRequest>(
      `${baseUrl}/api/auth/reset-password`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
      request
    );

    if (response.ok === true) {
      return;
    }

    const data = await response.json();

    throw new ResetPasswordError('Unable to reset password', data);
  }

  return {
    logUserIn,
    refreshAccessToken,
    sendForgotPasswordEmail,
    verifyForgotPasswordToken,
    resetUserPassword,
  };
}
