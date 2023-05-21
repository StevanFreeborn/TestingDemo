import App from '../src/App';
import * as UserContext from '../src/context/UserContext';
import * as AuthService from '../src/services/authService';
import { render } from './utils/testUtils';
jest.useFakeTimers();

describe('App', () => {
  const useUserContextSpy = jest.spyOn(UserContext, 'useUserContext');
  const useAuthServiceSpy = jest.spyOn(AuthService, 'useAuthService');
  const setIntervalSpy = jest.spyOn(global, 'setInterval');

  beforeEach(() => {
    useUserContextSpy.mockClear();
  });

  it('should not call refreshToken when userState is null', () => {
    useUserContextSpy.mockReturnValue({
      userState: null,
      dispatchUserAction: jest.fn(),
    });
    render(<App />);
    expect(useAuthServiceSpy).toBeCalledTimes(0);
  });

  it('should not call setInterval when userState is null', () => {
    useUserContextSpy.mockReturnValue({
      userState: null,
      dispatchUserAction: jest.fn(),
    });
    render(<App />);
    expect(setIntervalSpy).toBeCalledTimes(0);
  });

  it('should call setInterval when userState is not null', () => {
    const refreshTokenMock = jest.fn();

    useAuthServiceSpy.mockReturnValue({
      refreshToken: refreshTokenMock,
      logUserIn: jest.fn(),
    });

    useUserContextSpy.mockReturnValue({
      userState: {
        expiration: new Date().toISOString(),
        expiresIn: 0,
        token: 'token',
        user: {
          id: 'id',
          username: 'username',
          email: 'email',
        },
      },
      dispatchUserAction: jest.fn(),
    });
    render(<App />);
    expect(refreshTokenMock).toBeCalledTimes(0);
  });
});
