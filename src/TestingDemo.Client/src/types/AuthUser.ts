import { User } from './User';

export type AuthUser = {
  expiration: string;
  expiresIn: number;
  token: string;
  user: User;
};
