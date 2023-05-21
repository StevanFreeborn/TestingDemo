import { AUTHORIZATION_HEADER } from '../constants';
import { AuthUser } from '../types/AuthUser';

export function getAuthHeader(
  userState: AuthUser | null
): HeadersInit | undefined {
  const token = userState?.token;
  if (token === undefined) {
    return {};
  }
  return { [AUTHORIZATION_HEADER]: `Bearer ${token}` };
}
