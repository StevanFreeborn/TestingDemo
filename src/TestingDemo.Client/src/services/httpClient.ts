import { useNavigate } from 'react-router-dom';
import { UserActions, useUserContext } from '../context/UserContext';

export function useClient() {
  const { userState, dispatchUserAction } = useUserContext();
  const navigate = useNavigate();

  function getAuthHeader(url: string): HeadersInit | undefined {
    const token = userState?.token;
    const apiUrl = process.env.API_URL;

    if (
      token === undefined &&
      (apiUrl === undefined || url.startsWith(apiUrl) === false)
    ) {
      return {};
    }

    return { Authorization: `Bearer ${token}` };
  }

  async function client(url: string, config: RequestInit): Promise<Response> {
    const requestConfig = {
      ...config,
      headers: {
        ...config.headers,
        ...getAuthHeader(url),
      },
      credentials: 'include' as RequestCredentials,
    };

    const request = new Request(url, requestConfig);
    const response = await fetch(request);

    if (response.status === 401) {
      dispatchUserAction({ type: UserActions.LOGOUT });
      navigate('/Public/Login');
    }

    return response;
  }

  async function get(url: string, config?: RequestInit): Promise<Response> {
    const init = { ...config, method: 'GET' };
    return await client(url, init);
  }

  async function post<T>(
    url: string,
    body?: T,
    config?: RequestInit
  ): Promise<Response> {
    const init = { ...config, method: 'POST', body: JSON.stringify(body) };
    return await client(url, init);
  }

  async function put<T>(
    url: string,
    body: T,
    config?: RequestInit
  ): Promise<Response> {
    const init = { ...config, method: 'PUT', body: JSON.stringify(body) };
    return await client(url, init);
  }

  async function del(url: string, config?: RequestInit): Promise<Response> {
    const init = { ...config, method: 'DELETE' };
    return await client(url, init);
  }

  return {
    get: get,
    post: post,
    put: put,
    delete: del,
  };
}
