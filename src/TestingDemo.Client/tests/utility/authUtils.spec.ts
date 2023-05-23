import { AUTHORIZATION_HEADER } from '../../src/constants';
import { AuthUser } from '../../src/types/AuthUser';
import { getAuthHeader } from '../../src/utils/authUtils';

describe('authUtils', () => {
  describe('getAuthHeader', () => {
    it('should return an empty object when authenticated user is null', () => {
      const authUser = null;
      const result = getAuthHeader(authUser);
      expect(result).toEqual({});
    });

    it('should return an object with an authorization header when authenticated user is given', () => {
      const authUser: AuthUser = {
        expiration: new Date().toISOString(),
        expiresIn: 0,
        token: 'token',
        user: { id: 'id', username: 'username', email: 'email' },
      };
      const result = getAuthHeader(authUser);
      expect(result).toEqual({
        [AUTHORIZATION_HEADER]: `Bearer ${authUser.token}`,
      });
    });
  });
});
