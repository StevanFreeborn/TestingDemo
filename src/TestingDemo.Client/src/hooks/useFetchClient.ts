import { fetchClient } from '../http/fetchClient';
import { getAuthHeader } from '../utils/authUtils';
import { useUserContext } from './useUserContext';

export function useFetchClient() {
  const { userState, refreshAccessToken } = useUserContext();
  const authHeader = getAuthHeader(userState);

  return fetchClient({
    authHeader,
    unauthorizedResponseHandler: refreshAccessToken,
  });
}
